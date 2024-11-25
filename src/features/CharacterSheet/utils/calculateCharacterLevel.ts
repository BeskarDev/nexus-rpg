export const calculateCharacterLevel = (xp: number) => {
	switch (true) {
		case xp < 10:
			return 1
		case xp < 16:
			return 2
		case xp < 24:
			return 3
		case xp < 32:
			return 4
		case xp < 42:
			return 5
		case xp < 52:
			return 6
		case xp < 64:
			return 7
		case xp < 76:
			return 8
		case xp < 90:
			return 9
		default:
			return 10
	}
}
