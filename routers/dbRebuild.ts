import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import fetch from "node-fetch";
import { AchievementAPI, UserAPI } from "../types";

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

            const typeResponse = await fetch(`http://localhost:3001/db-rebuild/favorite-type/${favoriteType}`);
            const typeObj: any = await typeResponse.json();

            newUsers.push({
                _id,
                achievements,
                avatar: `${avatarObj.name}.png`,
                background: `${backgroundObj.name}.png`,
                createdAt,
                customBackgrounds: customBackgrounds.map(b => (b as any).img),
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
                rank: Number(rank),
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

        console.log(newUsers.length);


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
                newImages.push({ _id, src: avatarObj.name });
            }

            newNews.push({
                _id,
                title,
                description,
                images: newImages,
                videos,
                otherLinks,
                views,
                viewers,
                comments: comments.map((c: any) => ({
                    user: { '$oid': c.userID },
                    createdAt: c.date,
                    text: c.text,
                    likes: c.likes.map((l: any) => ({ '$oid': l })),
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

    .get('/test', async (req, res) => {
        const json = await readFile('./public/copy/new-news.json', 'utf-8');
        const data = JSON.parse(json);

        console.log(data.length);


        res.end();
    })