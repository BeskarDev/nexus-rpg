// function to be used when data structure changes and needs to be migrated in firestore
/* const updateAllFromCollection = async (collectionName) => {
	const col = collection(db, collectionName)

	const newDocumentBody = {
		message: 'hello world',
	}

	col
		.where('message', '==', 'goodbye world')
		.get()
		.then((response) => {
			let batch = firebase.firestore().batch()
			response.docs.forEach((doc) => {
				const docRef = firebase
					.firestore()
					.collection(collectionName)
					.doc(doc.id)
				batch.update(docRef, newDocumentBody)
			})
			batch.commit().then(() => {
				logger.debug(`updated all documents inside ${collectionName}`)
			})
		})
} */
