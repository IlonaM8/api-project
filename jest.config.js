module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    setupFilesAfterEnv: [
        "./src/lib/middleware/multer.mock.ts"
    ]

};
