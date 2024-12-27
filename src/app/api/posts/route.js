
import { posts } from "@/data/posts";
import connectDB from "@/lib/mogodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

// 전체 글 조회 - GET 요청 처리
export async function GET() {
    try {
        // 몽고 연결
        await connectDB();
        // posts 모델을 이용해 전체 글 조회 ({빈 객체를 넣어 모든 글을 조회}) / 1은 오름차순, -1은 내림차순
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ posts });
    }
    catch (error) {
        return NextResponse.json(
            { error: '게시글을 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

// 글 생성 - POST 요청 처리
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.title || !data.content) {
            return NextResponse.json(
                { error: '제목과 내용을 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        const posts = await Post.create(data);
        return NextResponse.json(posts, { status: 201 });
    }
    catch (error) {
        return NextResponse.json(
            { error: '게시글을 생성하는데 실패했습니다.' },
            { status: 500 }
        );
    }
}