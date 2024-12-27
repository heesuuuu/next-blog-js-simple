"use client";
import { formatDate } from "@/utils/formatDate";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    

    //마운트 시
    useEffect(() => {
        //게시글 목록 불러오기
        //axios.get(api주소).then(()=>{}).catch(()=>{})
        axios
            .get("/api/posts")
            .then((res) => {
                setPosts(res.data.posts);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    //로딩 중
    if(loading){return <div>로딩 중...</div>}
    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-black">블로그 목록</h2>
            <Link href={'/posts/write'} className="p-3 rounded-md bg-purple-400 text-white">글쓰기</Link>
            <div className="divide-y divide-gray-300">
                {posts.map((post) => (
                    <Link key={post.id} href={`/posts/${post.id}`} className="block my-4 py-4 border">
                        <h3 className="text-2xl font-semibold ">{post.title}</h3>
                        <p>{post.content}</p>
                        <span className="text-gray-400">{formatDate(post.createdAt)}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
