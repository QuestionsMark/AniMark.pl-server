export const everyoneAuth = (parts: string[], method: string) => (
    parts[0] === 'city-defence' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'login' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'sword-art-online-clicker' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'users' && !(parts[1]) && method === 'POST'
)

export const usersAuth = (parts: string[], method: string) => (
    parts[0] === 'anime' && parts[2] === 'comments' && !(parts[3]) && method === 'POST' ||
    parts[0] === 'anime' && parts[2] === 'rate' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'soundtracks' && parts[4] === 'like' && parts[5] && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'comments' && parts[4] === 'like' && parts[5] && method === 'PUT' ||
    parts[0] === 'anime-on-top' && parts[1] === 'vote' && !(parts[2]) && method === 'POST' ||
    parts[0] === 'news' && parts[2] === 'comments' && !(parts[3]) && method === 'POST' ||
    parts[0] === 'news' && parts[2] === 'comments' && parts[4] === 'like' && parts[5] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'avatar' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'privacy' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'background' && !(parts[3]) && method === 'POST' ||
    parts[0] === 'users' && parts[2] === 'like' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'favorite-anime' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'watched' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'stopped' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'planned' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'process-of-watching' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'background' && parts[3] && method === 'PUT' ||
    parts[0] === 'users' && parts[2] === 'background' && parts[3] && method === 'DELETE' ||
    parts[0] === 'users' && parts[1] && method === 'PATCH'
)

export const moderatorsAuth = (parts: string[], method: string) => (
    parts[0] === 'anime' && parts[2] === 'comments' && parts[3] && method === 'DELETE' ||
    parts[0] === 'news' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'news' && parts[2] === 'comments' && parts[3] && method === 'DELETE'
)

export const adminAuth = (parts: string[], method: string) => (
    parts[0] === 'achievements' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'achievements' && parts[1] && method === 'DELETE' ||
    parts[0] === 'achievements' && parts[1] && method === 'PATCH' ||
    parts[0] === 'anime' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'anime' && parts[1] && method === 'DELETE' ||
    parts[0] === 'anime' && parts[1] && method === 'PATCH' ||
    parts[0] === 'anime' && parts[2] === 'soundtracks' && !(parts[3]) && method === 'POST' ||
    parts[0] === 'anime' && parts[2] === 'soundtracks' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'background' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'baner' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'mini' && !(parts[3]) && method === 'PUT' ||
    parts[0] === 'anime' && parts[2] === 'soundtracks' && parts[3] && method === 'DELETE' ||
    parts[0] === 'anime-on-top' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'city-defence' && parts[1] && method === 'DELETE' ||
    parts[0] === 'news' && parts[1] && method === 'DELETE' ||
    parts[0] === 'news' && parts[2] === 'image' && parts[3] && method === 'DELETE' ||
    parts[0] === 'news' && parts[1] && method === 'PATCH' ||
    parts[0] === 'projects' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'sword-art-online-clicker' && parts[1] && method === 'DELETE' ||
    parts[0] === 'types' && !(parts[1]) && method === 'POST' ||
    parts[0] === 'types' && parts[1] && method === 'DELETE' ||
    parts[0] === 'types' && parts[1] && method === 'PATCH'
)