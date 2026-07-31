import React, { useState, useRef } from 'react'
import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import { MarkButton, RuleInfo } from '../../components'
import { logger } from '../../utils'

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
			logger.error('Error processing profile picture:', err)
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

	return (
		/*
			M13 S6 (owner review) — the portrait as a PLATE.
			
			It was a 100px circular MUI `Paper` with `elevation` (a drop shadow, which this
			theme forbids outright), a Material camera glyph, a red circular delete badge
			pinned to its corner in `error.main` with white ink, and two lines of caption
			underneath — one naming it and one stating the file limits. Four things wrong at
			once: a raised circle is the avatar idiom of every web app, the shadow is a
			banned effect, the badge was the only stock-Material-red control left on the
			sheet, and the limits are setup trivia occupying permanent space beside a
			character's face.
			
			It is a framed plate now: hard vertices, corner rivets, keyline and wash, sized
			to the record beside it. Empty, it draws the `folk` mark — a figure, which is
			what is missing — over its own instruction. The limits moved into the gloss the
			whole sheet uses for "explain this", and the delete is the standard mark button.
		*/
		<Box className="cs-portrait">
			<Box
				className="cs-portrait__plate"
				data-drag={dragOver || undefined}
				role="button"
				tabIndex={0}
				aria-label={
					currentImage ? 'Replace character portrait' : 'Add character portrait'
				}
				onClick={handleClick}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault()
						fileInputRef.current?.click()
					}
				}}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				<span className="cs-rivet cs-rivet-tl" aria-hidden="true" />
				<span className="cs-rivet cs-rivet-tr" aria-hidden="true" />
				<span className="cs-rivet cs-rivet-br" aria-hidden="true" />
				<span className="cs-rivet cs-rivet-bl" aria-hidden="true" />

				{currentImage ? (
					<img
						className="cs-portrait__image"
						src={currentImage}
						alt="Character portrait"
						draggable={false}
					/>
				) : (
					<Box className="cs-portrait__empty">
						<StatSigil name="folk" size={30} />
						<span>{dragOver ? 'Drop to set' : 'Click or drag'}</span>
					</Box>
				)}

				{uploading && (
					<Box className="cs-portrait__busy">
						<CircularProgress size={28} />
					</Box>
				)}
			</Box>

			<Box className="cs-portrait__strip">
				<Typography component="span" className="cs-portrait__label">
					Portrait
				</Typography>
				{/* The file limits are setup trivia — they belong behind the sheet's own
					"explain this" mark rather than printed under every character's face. */}
				<RuleInfo label="About the portrait">
					A JPG, PNG or WebP up to 500KB. It is resized to 200x200 and stored
					with the character, so it travels with the sheet rather than living on
					a host that can go away.
				</RuleInfo>
				{currentImage && !uploading && (
					<MarkButton
						glyph="×"
						label="Remove portrait"
						onClick={() => {
							onProfilePictureUpdate('')
							setCurrentImage('')
						}}
					/>
				)}
			</Box>

			<input
				ref={fileInputRef}
				type="file"
				accept=".jpg,.jpeg,.png,.webp"
				onChange={handleFileUpload}
				style={{ display: 'none' }}
				disabled={uploading}
			/>

			{error && (
				<Alert
					severity="error"
					sx={{ fontSize: 'var(--nexus-text-xs)', maxWidth: '12rem' }}
				>
					{error}
				</Alert>
			)}
		</Box>
	)
}
