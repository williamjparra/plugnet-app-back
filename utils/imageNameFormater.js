const generateRandomString = require("./generateRandomString")

const imageNameFormater = (ownerId, name) => {
    const nameExtract = /[.][a-zA-Z0-9]+($|\n)/
    var fileExt = nameExtract.exec(name)[0]
    const randomString = generateRandomString(16)

    const filename = `${ownerId}.${randomString}${fileExt}`
    console.log(fileExt)

    return filename
}

module.exports = imageNameFormater