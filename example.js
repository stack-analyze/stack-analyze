const { get } = require("axios").default


const data = async() => {
	try {
		const { data } = await get('https://jsonplaceholder.typicode.com/users')
		console.table(data)
	} catch (err) {
		console.error(err.message)
	}
}

data()