import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import fetch from "node-fetch";
import { AchievementAPI, UserAPI } from "../types";
import { v4 as uuid } from "uuid";

export const dbRebuildRouter = Router();

dbRebuildRouter
    .get('/users', async (req, res) => {
        const json = await readFile('./public/copy/users.json', 'utf-8');
        const users: UserAPI[] = JSON.parse(json);

        const newUsers = [];
        for (const { _id, achievements, avatar, background, createdAt, customBackgrounds, email, favoriteAnime, favoriteType, introduction, likes, login, password, points, rank, userAnimeData, username } of users) {
            const avatarResponse = await fetch(`http://localhost:3001/db-rebuild/avatar/${avatar}`);
            const avatarObj: any = await avatarResponse.json();

            const backgroundResponse = await fetch(`http://localhost:3001/db-rebuild/background/${background}`);
            const backgroundObj: any = await backgroundResponse.json();

            const typeResponse = await fetch(`http://localhost:3001/db-rebuild/favorite-type/${favoriteType || 'Brak'}`);
            const typeObj: any = await typeResponse.json();

            newUsers.push({
                _id,
                achievements,
                avatar: `${avatarObj.name}.png`,
                background: `${backgroundObj.name}.png`,
                createdAt,
                customBackgrounds: customBackgrounds.map(b => `${(b as any).img}.png`),
                email,
                favoriteAnime: favoriteAnime.map(a => ({
                    anime: { '$oid': (a as any).id },
                    rate: a.rate,
                })),
                favoriteType: typeObj.results ? { '$oid': typeObj.results._id } : null,
                introduction,
                likes: likes.map(l => ({ '$oid': l })),
                login,
                password,
                points: {
                    watchedAnime: points.watchedAnime,
                    comments: points.comments,
                    descriptions: points.descriptions,
                    accountTime: points.accountTime,
                    animeOnTop: points.animeOnTop,
                    whatsTheMelody: points.whatsTheMelody,
                    profileLikes: (points as any).profilesLikes,
                    soundtrackLikes: (points as any).soundtracksLikes,
                },
                sumOfPoints: Object.entries(points).reduce((p, a: [string, number]) => p + a[1], 0),
                rank: Number(rank) - 1,
                userAnimeData: {
                    planned: userAnimeData.planned.map(p => ({ '$oid': (p as any).id })),
                    processOfWatching: userAnimeData.processOfWatching.map(p => ({ '$oid': (p as any).id })),
                    stopped: userAnimeData.stopped.map(p => ({ '$oid': (p as any).id })),
                    watched: userAnimeData.watched.map(p => ({
                        anime: { '$oid': (p as any).id },
                        rate: p.rate,
                    })),
                },
                username,
            });
        }

        await writeFile('./public/copy/new-users.json', JSON.stringify(newUsers));
        res.end();
    })

    .get('/ach', async (req, res) => {
        const json = await readFile('./public/copy/achievements.json', 'utf-8');
        const achievements: AchievementAPI[] = JSON.parse(json);
        const newAchievements = achievements.map(a => ({
            ...a,
            createdAt: { "$date": { "$numberLong": "1636305039119" } },
        }));

        await writeFile('./public/copy/new-achievements.json', JSON.stringify(newAchievements));
        res.end();
    })

    .get('/news', async (req, res) => {
        const json = await readFile('./public/copy/news.json', 'utf-8');
        const news: any[] = JSON.parse(json);
        const newNews = [];

        for (const { _id, title, description, images, videos, otherLinks, views, viewers, comments, createdAt } of news) {

            const newImages = [];
            for (const { _id, id } of images) {

                const imageResponse = await fetch(`http://localhost:3001/db-rebuild/avatar/${id}`);
                const avatarObj: any = await imageResponse.json();
                newImages.push(`${avatarObj.name}.png`);
            }

            newNews.push({
                _id,
                title,
                description,
                images: newImages,
                videos: videos.map((l: any) => l.src),
                otherLinks: otherLinks.map((l: any) => ({ src: l.link, note: l.note })),
                views,
                viewers,
                comments: comments.map((c: any) => ({
                    user: { '$oid': c.userID },
                    createdAt: c.date,
                    text: c.text,
                    likes: c.likes.map((l: any) => ({ '$oid': l })),
                    id: uuid(),
                })),
                createdAt,
            });

        }

        await writeFile('./public/copy/new-news.json', JSON.stringify(newNews));
        res.end();
    })

    .get('/saos', async (req, res) => {
        const json = await readFile('./public/copy/saos.json', 'utf-8');
        const saos: any[] = JSON.parse(json);

        const newSaos = saos.map(s => ({
            ...s,
            createdAt: { "$date": { "$numberLong": String(Date.now()) } },
        }))

        await writeFile('./public/copy/new-saos.json', JSON.stringify(newSaos));

        res.end();
    })

    .get('/wtms', async (req, res) => {
        const json = await readFile('./public/copy/wtms.json', 'utf-8');
        const wtms: any[] = JSON.parse(json);

        const newWtms: any = [];

        for (const { _id, answears, votes, comments, mp3, correctAnswear, createdAt } of wtms) {

            const newComments = [];
            for (const { username, text, likes } of comments) {
                const imageResponse = await fetch(`http://localhost:3001/db-rebuild/user/${username}`);
                const avatarObj: any = await imageResponse.json();
                if (avatarObj) {
                    newComments.push({
                        user: { '$oid': avatarObj },
                        createdAt: { "$date": { "$numberLong": String(Date.now()) } },
                        text,
                        likes: likes.map((l: any) => ({ '$oid': l })),
                    });
                }
            }

            const audioResponse = await fetch(`http://localhost:3001/db-rebuild/audio/${mp3}`);
            const audioObj: any = await audioResponse.json();

            if (audioObj) {
                newWtms.push({
                    _id,
                    answears,
                    votes: votes.map((v: any) => ({
                        title: v.title,
                        votes: v.votes.map((v: any) => ({ '$oid': v })),
                    })),
                    comments: newComments,
                    src: `${audioObj.name}.mp3`,
                    correctAnswear,
                    createdAt,
                });
            }
        }

        await writeFile('./public/copy/new-wtms.json', JSON.stringify(newWtms));

        res.end();
    })

    .get('/aots', async (req, res) => {
        const json = await readFile('./public/copy/aots.json', 'utf-8');
        const aots: any[] = JSON.parse(json);

        const newAots = aots.map(({ _id, winner, votes, date }) => ({
            _id,
            votes: votes.map((v: any) => ({
                title: v.title,
                votes: v.votes.map((v: any) => ({ '$oid': v })),
            })),
            winner: { '$oid': winner.id },
            createdAt: { "$date": { "$numberLong": String(new Date(date).getTime()) } },
        }));

        await writeFile('./public/copy/new-aots.json', JSON.stringify(newAots));

        res.end();
    })

    .get('/anime', async (req, res) => {
        const json = await readFile('./public/copy/animes.json', 'utf-8');
        const anime: any[] = JSON.parse(json);

        const newDescription = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae harum tenetur deserunt illum temporibus accusantium debitis perspiciatis suscipit ab nisi cupiditate nihil quibusdam non neque veniam, minus at ratione itaque maiores? Neque molestiae, laudantium cupiditate assumenda repellendus exercitationem odio, officia similique dolorem tenetur voluptas, omnis non. Aperiam, consequuntur. Dicta magni voluptate deleniti commodi corrupti modi exercitationem repellendus dolorum repellat est ducimus aspernatur ipsum sint quis praesentium obcaecati accusamus quisquam similique odit quam dolore corporis, sit sed provident.
        Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio quis deleniti nemo. Eum, quia quaerat ducimus corrupti possimus deserunt exercitationem natus error, neque quibusdam dolor sit cum ipsa enim sapiente mollitia illo! Corrupti sunt facere facilis expedita voluptatibus obcaecati rem sit beatae maxime consequuntur nam deleniti perferendis sequi magni asperiores ipsam, dolorem delectus quam recusandae suscipit aliquam error? Consectetur est ullam tempore fugiat facilis rerum quia aliquam deserunt pariatur id harum inventore cupiditate ut delectus ipsa veniam reprehenderit sapiente, perferendis officia ducimus eos laboriosam voluptatem asperiores deleniti. Eveniet, quos consequatur. Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio maxime aut hic ad adipisci architecto, quos possimus similique quis deleniti nemo. Maxime consequuntur nam deleniti perferendis sequi magni asperiores ipsam, dolorem delectus quam recusandae suscipit aliquam error? Consectetur est ullam tempore fugiat facilis rerum quia aliquam deserunt pariatur id harum inventore cupiditate ut delectus ipsa veniam reprehenderit sapiente, perferendis officia ducimus eos laboriosam voluptatem asperiores deleniti.
        Eveniet, quos consequatur. Id nostrum inventore mollitia quam quas qui at, aliquid quo esse labore ipsa maxime doloribus tempora aspernatur culpa officia ducimus ex facere, eveniet soluta. Officiis consequuntur tenetur ut dicta officia quas, necessitatibus, odio maxime aut hic ad adipisci architecto, quos possimus similique quis deleniti nemo.`;

        const newAnime: any[] = [];

        for (const { _id, types, rate, likes, soundtracks, seasons, comments, kind, title, watchLink, info, images, description, averageRate } of anime) {

            const newAverageRate = rate.reduce((p: number, a: any) => p + a.rate, 0) / rate.length;

            const newGaleryImages: any[] = [];

            newGaleryImages.push({ src: `${images.background.img}.png`, fromAnime: title });
            newGaleryImages.push({ src: `${images.baner.img}.png`, fromAnime: title });
            newGaleryImages.push({ src: `${images.mini.img}.png`, fromAnime: title });

            for (const { img } of images.galeryImages) {
                if (newGaleryImages.findIndex(i => i.src === `${img}.png`) === -1) {
                    newGaleryImages.push({ src: `${img}.png`, fromAnime: title });
                }
            }

            newAnime.push({
                _id,
                types: types.map((t: any) => ({ '$oid': t.id })),
                rate: rate.map((r: any) => ({
                    user: { '$oid': r.user },
                    rate: r.rate,
                })),
                likes: likes.map((l: any) => ({ '$oid': l })),
                soundtracks: soundtracks.map((s: any) => ({
                    src: `${s.mp3}.mp3`,
                    title: s.title,
                    composer: s.composer,
                    likes: s.likes.map((l: any) => ({ '$oid': l })),
                })),
                seasons: seasons.map((s: any) => ({ '$oid': s.id })),
                comments: comments.map((c: any) => ({
                    user: { '$oid': c.userID },
                    createdAt: c.date,
                    text: c.text,
                    likes: c.likes.map((l: any) => ({ '$oid': l })),
                    id: uuid(),
                })),
                kind,
                title,
                watchLink,
                info: {
                    scenario: info.scenario,
                    productionYear: Number(info.productionDate),
                    duration: info.duration,
                },
                images: {
                    background: {
                        src: `${images.background.img}.png`,
                        fromAnime: title,
                    },
                    baner: {
                        src: `${images.baner.img}.png`,
                        fromAnime: title,
                    },
                    mini: {
                        src: `${images.mini.img}.png`,
                        fromAnime: title,
                    },
                    galeryImages: newGaleryImages,
                },
                description: {
                    author: { '$oid': description.authorID ? description.authorID : '62ac254dcd191734242d3e5f' },
                    description: description.description.slice(0, 11) === "Lorem ipsum" ? newDescription : description.description,
                    createdAt: { "$date": { "$numberLong": String(new Date(description.addedDate).getTime()) } },
                },
                averageRate: newAverageRate,
                createdAt: { "$date": { "$numberLong": String(new Date(description.addedDate).getTime()) } },
            });
        }

        await writeFile('./public/copy/new-animes.json', JSON.stringify(newAnime));

        res.end();
    })

    .get('/images', async (req, res) => {
        const json = await readFile('./public/copy/images.json', 'utf-8');
        const data = JSON.parse(json);
        for (const image of data) {
            const binaryData = Buffer.from(image.buffer['$binary'].base64, 'base64').toString('binary');
            await writeFile(`./public/media/${image.name}.png`, binaryData, 'binary');
        }
        res.end();
    })

    .get('/audio', async (req, res) => {
        const json = await readFile('./public/copy/soundtracks.json', 'utf-8');
        const data = JSON.parse(json);
        for (const soundtrack of data) {
            const binaryData = Buffer.from(soundtrack.buffer['$binary'].base64, 'base64').toString('binary');
            await writeFile(`./public/media/${soundtrack.name}.mp3`, binaryData, 'binary');
        }
        res.end();
    })

    .get('/sword-art-online-clicker', async (req, res) => {
        const json = await readFile('./public/copy/sword-art-online-results.json', 'utf-8');
        const data = JSON.parse(json);

        const newData = data.map((a: any) => {
            const timeArray = a.completionTime.split(':').map((t: any) => Number(t));
            const time = (timeArray[0] * 60 * 60 + timeArray[1] * 60 + timeArray[2]) * 1000;
            return {
                ...a,
                completionTime: time,
                createdAt: { "$date": { "$numberLong": String(new Date().getTime()) } },
            }
        });

        await writeFile('./public/copy/new-sword-art-online-results.json', JSON.stringify(newData));
        res.end();
    })

    .get('/city-defence', async (req, res) => {
        const json = await readFile('./public/copy/city-defence-results.json', 'utf-8');
        const data = JSON.parse(json);

        const newData = data.map((a: any) => {
            const obj = {
                ...a,
                points: a.score,
            };
            return (({ updatedAt, score, ...o }) => o)(obj);
        });

        await writeFile('./public/copy/new-city-defence-results.json', JSON.stringify(newData));
        res.end();
    })

    .get('/test', async (req, res) => {
        const json = await readFile('./public/copy/animes.json', 'utf-8');
        const data = JSON.parse(json);

        const newData = data.map((a: any) => {
            return {
                ...a,
                images: {
                    galeryImages: a.images.galeryImages,
                    background: a.images.galeryImages[0],
                    baner: a.images.galeryImages[1],
                    mini: a.images.galeryImages[2],
                }
            }
        });

        await writeFile('./public/copy/new-animes.json', JSON.stringify(newData));
        res.end();
    })