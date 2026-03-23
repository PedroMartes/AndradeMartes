import './style.css'

interface PageProps {
    // Ajuste na tipagem para Promise
    params: Promise<{ id: string }>;
}

export default async function DetalhePost({ params }: PageProps) {
    // 1. Você precisa dar await no params primeiro
    const { id } = await params;

    // 2. Agora o id existe e a busca vai funcionar
    const response = await fetch(`https://dummyjson.com/posts/${id}`);
    const post = await response.json();

    // Se o fetch falhar ou o post não existir, o retorno pode ser vazio
    if (!post.title) {
        return <div>Post não encontrado.</div>;
    }

    return (
        <main>
            <div className="detalhesContainer">
                <h1 className='detalhesTitle'>{post.title}</h1>
                <p className='detalhesText'>{post.body}</p>
                <p className='detalhesViews'>Views: {post.views}</p>
            </div>

        </main>
    );
}