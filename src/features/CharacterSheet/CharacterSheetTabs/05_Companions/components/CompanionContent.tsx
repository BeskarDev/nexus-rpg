import {
	TextField,
	Box,
} from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CompanionContentProps {
	editingId: string | null
	companionId: string
	markdown: string
	editMarkdown: string
	onEditMarkdownChange: (markdown: string) => void
}

export const CompanionContent: React.FC<CompanionContentProps> = ({
	editingId,
	companionId,
	markdown,
	editMarkdown,
	onEditMarkdownChange,
}) => {
	if (editingId === companionId) {
		return (
			<TextField
				multiline
				rows={10}
				fullWidth
				value={editMarkdown}
				onChange={(e) => onEditMarkdownChange(e.target.value)}
				placeholder="Enter companion description in Markdown..."
				variant="outlined"
			/>
		)
	}

	return (
		<Box sx={{ '& .markdown-content': { fontSize: '0.875rem' } }}>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{markdown || 'No description available.'}
			</ReactMarkdown>
		</Box>
	)
}
