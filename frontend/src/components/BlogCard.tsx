import { Link } from "react-router-dom";

interface BlogCardType {
    id: number,
    author: string,
    title : string,
    content : string,
    publishedDate : string
}
export const BlogCard = ({id, author, title, content, publishedDate} : BlogCardType) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <ProfileDP author={author} size="small"/>
                </div>
                <div className="font-extralight flex flex-col justify-center pl-2">
                    {author}
                </div>
                <div className="flex flex-col justify-center pl-2">
                    <Circle />
                </div>
                <div className=" font-thin flex flex-col justify-center pl-2">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2 overflow-hidden overflow-ellipsis">
                {title}
            </div>
            <div className="text-md font-thin overflow-hidden overflow-ellipsis">
                {content.length < 100 ? content : content.slice(0, 100) + `...`}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
                {Math.ceil(content.length/100) + ` min read`}
            </div>
        </div>
    </Link>
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function ProfileDP({author, size} : {author : string | undefined, size:"small" | "large"}){
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ? `w-6 h-6` : `w-10 h-10`} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size == "small" ? `text-xs` : `text-md`} font-extralight text-gray-600 dark:text-gray-300`}>{author ? author[`0`].toUpperCase() : "A"}</span>
    </div>

}