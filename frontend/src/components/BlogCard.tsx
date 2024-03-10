
interface BlogCardType {
    author: string,
    title : string,
    content : string,
    publishedDate : string
}
export const BlogCard = ({author, title, content, publishedDate} : BlogCardType) => {
    return <div>
        <div>
            <div>
            <ProfileDP author={author}/>
            </div>
            <div>
                {author}
            </div>
            <div>
                {publishedDate}
            </div>
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.length < 100 ? content : content.slice(0, 100) + `...`}
        </div>
        <div>
            {content.length < 100 ? `1 min read` : content.length/100 + ` min read`}
        </div>
    </div>
};


function ProfileDP({author} : {author : string}){
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{author[0]}</span>
    </div>

}