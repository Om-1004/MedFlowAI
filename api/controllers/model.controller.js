export const test = async (req, res) => {
    console.log("In the test function")
    res.json({message: "Works"})
}