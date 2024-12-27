"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const WritePage = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleSubmit = async (e) => {

        //글쓰기 버튼 클릭 시 posts 페이지로 이동
        e.preventDefault();
        
        try{
            const res = await axios.post("/api/posts", {title, content});
            
            if(res.status === 201){
                alert("글이 등록되었습니다.");
                router.push("/posts");
            }else{
                alert("글 등록에 실패했습니다.");
            }
        }
        catch(error){
            console.error(error);
            alert("오류 발생");
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="sr-only">포스트 글쓰기</h2>
            <form onSubmit={handleSubmit} className="flex flex-col divide-gray-300">
                {/* 제목 */}
                <div>
                    <label htmlFor="tit" className="sr-only">
                        제목
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="tit"
                        id="tit"
                        placeholder="제목을 입력하세요."
                        className="text-2xl font-black py-5 border-b-4 border-gray-400 w-full"
                    />
                </div>
                {/* 본문 */}
                <div className="flex-1">
                    <label htmlFor="cont" className="sr-only">
                        내용
                    </label>
                    <textarea
                        name="cont"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        id="cont"
                        placeholder="내용을 입력하세요."
                        className="w-full h-full text-1xl"
                    ></textarea>
                </div>

                {/* 확인, 취소 */}
                <div className="">
                    <button className=" p-3 mr-3 bg-gray-300 rounded-md">취소</button>
                    <button type="submit" className=" p-3 bg-sky-400 rounded-md">
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WritePage;
