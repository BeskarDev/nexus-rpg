// Helper function to sanitize HTML tags from text for use in form fields
export const sanitizeHtml = (html: string): string => {
	return html
		.replace(/<br\s*\/?>/gi, '\n') // Replace <br> and <br/> with newlines
		.replace(/<\/?strong>/gi, '') // Remove <strong> tags
		.replace(/<\/?em>/gi, '') // Remove <em> tags
		.replace(/<\/?b>/gi, '') // Remove <b> tags
		.replace(/<\/?i>/gi, '') // Remove <i> tags
		.replace(/<\/?u>/gi, '') // Remove <u> tags
		.replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
		.trim()
}
