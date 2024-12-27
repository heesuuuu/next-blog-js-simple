const { NextResponse } = require("next/server")

const helloPosts = [
    { id: 1, title: "Hello" },
    { id: 2, title: "Hello, World!" },
    { id: 3, title: "Hello, World! World!" },
]

// 서버생성
export async function GET() {
    return NextResponse.json(helloPosts)
}