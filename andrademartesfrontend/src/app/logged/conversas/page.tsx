import Link from "next/link";
import "./style.css"


interface PostsProps {
    id: number;
    title: string;
    body: string;
    views: number;
}

interface ResponseProps {
    posts: PostsProps[]
}


export default async function Dashboard() {

    const response = await fetch('https://dummyjson.com/posts')

    const data: ResponseProps = await response.json()

    return (
        <main>
            <div className="conversasMainContainer">

                <h1 className="pageTitle">Conversas:</h1>
                
                <div className="coversaCardsContainer">

                    {data.posts.map(post => (

                        <Link key={post.id} href={`/logged/conversas/conversa/${post.id}`}>
                            <div className="conversaCard">
                                <h2 className="conversaCardTitle">{post.title}</h2>
                            </div>
                        </Link>

                    ))}

                </div>
            </div>
        </main >
    )
}