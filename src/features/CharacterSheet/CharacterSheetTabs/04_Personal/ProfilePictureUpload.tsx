import React, { useState, useRef } from 'react'
import {
	Box,
	Avatar,
	IconButton,
	Typography,
	CircularProgress,
	Tooltip,
	Alert,
	Paper,
} from '@mui/material'
import { PhotoCamera, Delete, CloudUpload } from '@mui/icons-material'

interface ProfilePictureUploadProps {
	profilePicture?: string
	onProfilePictureUpdate: (base64: string) => void
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
	profilePicture,
	onProfilePictureUpdate,
}) => {
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [dragOver, setDragOver] = useState(false)
	const [currentImage, setCurrentImage] = useState(profilePicture)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// Update currentImage when profilePicture prop changes
	React.useEffect(() => {
		setCurrentImage(profilePicture)
	}, [profilePicture])

	const MAX_FILE_SIZE = 500 * 1024 // 500KB limit for Firestore document size considerations
	const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

	const resizeImage = (
		file: File,
		maxWidth: number,
		maxHeight: number,
		quality: number,
	): Promise<string> => {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')
			const img = new Image()

			img.onload = () => {
				// Calculate new dimensions
				let { width, height } = img

				if (width > height) {
					if (width > maxWidth) {
						height = (height * maxWidth) / width
						width = maxWidth
					}
				} else {
					if (height > maxHeight) {
						width = (width * maxHeight) / height
						height = maxHeight
					}
				}

				canvas.width = width
				canvas.height = height

				// Draw and compress
				ctx?.drawImage(img, 0, 0, width, height)
				const base64 = canvas.toDataURL('image/jpeg', quality)
				resolve(base64)
			}

			img.onerror = reject
			img.src = URL.createObjectURL(file)
		})
	}

	const processFile = async (file: File) => {
		setError(null)
		setUploading(true)

		try {
			// Validate file type
			if (!ALLOWED_TYPES.includes(file.type)) {
				setError('Only JPEG, PNG, and WebP images are allowed')
				return
			}

			// Initial file size check
			if (file.size > 5 * 1024 * 1024) {
				// 5MB
				setError('File size must be less than 5MB')
				return
			}

			// Resize and compress image
			let base64 = await resizeImage(file, 200, 200, 0.8)

			// Check if base64 is still too large and compress further if needed
			while (base64.length > MAX_FILE_SIZE && base64.length > 0) {
				const currentQuality = Math.max(
					0.1,
					0.8 * (MAX_FILE_SIZE / base64.length),
				)
				base64 = await resizeImage(file, 150, 150, currentQuality)

				if (currentQuality <= 0.1) break // Prevent infinite loop
			}

			if (base64.length > MAX_FILE_SIZE) {
				setError(
					'Image is too large even after compression. Please try a smaller image.',
				)
				return
			}

			// Update the character's profile picture
			onProfilePictureUpdate(base64)
			setCurrentImage(base64) // Update local state immediately for instant feedback
		} catch (err) {
			console.error('Error processing profile picture:', err)
			setError('Failed to process image. Please try again.')
		} finally {
			setUploading(false)
		}
	}

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0]
		if (!file) return

		await processFile(file)

		// Clear the input
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragOver(false)

		const files = event.dataTransfer.files
		const file = files[0]

		if (file) {
			await processFile(file)
		}
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragOver(true)
	}

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setDragOver(false)
	}

	const handleClick = (event: React.MouseEvent) => {
		event.preventDefault()
		event.stopPropagation() // Prevent Docusaurus image zoom
		if (!uploading) {
			fileInputRef.current?.click()
		}
	}

	const handleDelete = (event: React.MouseEvent) => {
		event.preventDefault()
		event.stopPropagation() // Prevent triggering the upload click and Docusaurus handlers
		onProfilePictureUpdate('')
		setCurrentImage('') // Update local state immediately for instant feedback
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 1,
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<Paper
					elevation={dragOver ? 4 : 1}
					sx={{
						width: 100,
						height: 100,
						borderRadius: '50%',
						cursor: uploading ? 'default' : 'pointer',
						border: dragOver ? '2px dashed' : '2px solid',
						borderColor: dragOver ? 'primary.main' : 'divider',
						transition: 'all 0.2s ease-in-out',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: dragOver ? 'action.hover' : 'transparent',
						overflow: 'hidden',
						'&:hover': {
							borderColor: uploading ? 'divider' : 'primary.main',
							backgroundColor: uploading ? 'transparent' : 'action.hover',
						},
					}}
					onClick={handleClick}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
				>
					{currentImage ? (
						<>
							<Avatar
								src={currentImage}
								sx={{
									width: 96,
									height: 96,
									cursor: uploading ? 'default' : 'pointer',
									// Prevent Docusaurus image zoom by removing the data-zoom-src attribute
									'& img': {
										'data-zoom-src': 'none',
										cursor: uploading ? 'default' : 'pointer !important',
										'&:hover': {
											cursor: uploading ? 'default' : 'pointer !important',
										},
									},
								}}
								imgProps={{
									// Prevent image from being treated as zoomable by Docusaurus
									draggable: false,
									style: {
										cursor: uploading ? 'default' : 'pointer',
									},
								} as any}
							/>
							{currentImage && !uploading && (
								<IconButton
									onClick={handleDelete}
									sx={{
										position: 'absolute',
										top: -8,
										right: -8,
										backgroundColor: 'error.main',
										color: 'white',
										width: 24,
										height: 24,
										'&:hover': {
											backgroundColor: 'error.dark',
										},
									}}
									size="small"
								>
									<Delete sx={{ fontSize: 14 }} />
								</IconButton>
							)}
						</>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 0.5,
								color: 'text.secondary',
							}}
						>
							{dragOver ? (
								<CloudUpload sx={{ fontSize: 32 }} />
							) : (
								<PhotoCamera sx={{ fontSize: 32 }} />
							)}
							<Typography
								variant="caption"
								sx={{ fontSize: '0.65rem', textAlign: 'center' }}
							>
								{dragOver ? 'Drop here' : 'Click or drag'}
							</Typography>
						</Box>
					)}
				</Paper>

				{uploading && (
					<CircularProgress
						size={104}
						sx={{
							position: 'absolute',
							top: -2,
							left: -2,
							zIndex: 1,
						}}
					/>
				)}

				<input
					ref={fileInputRef}
					type="file"
					accept=".jpg,.jpeg,.png,.webp"
					onChange={handleFileUpload}
					style={{ display: 'none' }}
					disabled={uploading}
				/>
			</Box>

			{error && (
				<Alert
					severity="error"
					sx={{ mt: 1, fontSize: '0.75rem', maxWidth: '200px' }}
				>
					{error}
				</Alert>
			)}

			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ textAlign: 'center' }}
			>
				Character Portrait
			</Typography>
			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ textAlign: 'center', fontSize: '0.65rem' }}
			>
				Max 500KB • Auto-resized to 200×200
			</Typography>
		</Box>
	)
}
