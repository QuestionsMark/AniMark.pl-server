import { differenceInCalendarDays } from "date-fns";
import { ValidationError } from "../middlewares/error";
import { Anime } from "../models/anime";
import { AnimeOnTop } from "../models/animeOnTop";
import { User } from "../models/users";
import { AnimeAPI, AnimeOnTopAPI, Soundtrack, UserAPI } from "../types";
import { setAchievement, setWTMAchievement } from "./achievementsManager";

const getUser = async (id: string) => {
    const user = await User.findById(id) as UserAPI;
    if (!user) throw new ValidationError('Nie znaleziono użytkownika.');
    return user;
};
const getUsers = async () => {
    return await User.find().select('likes');
};
const getAnimeList = async () => {
    return await Anime.find() as AnimeAPI[];
};
const getAnimeOnTops = async () => {
    return await AnimeOnTop.find() as AnimeOnTopAPI[];
};

const setSumOfPoints = async (userId: string) => {
    const user = await User.findById(userId).select('points') as UserAPI;
    if (!user) return;
    const sumOfPoints = Object.entries(user.points).reduce((p, a: [string, number]) => p + a[1], 0);
    await User.findByIdAndUpdate(userId, { $set: { sumOfPoints } });
};

const saveWatchedAnimePoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.watchedAnime': value } });
    setSumOfPoints(userId);
};
const saveCommentsPoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.comments': value } });
    setSumOfPoints(userId);
};
const saveDescriptionsPoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.descriptions': value } });
    setSumOfPoints(userId);
};
const saveProfilesLikesPoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.profileLikes': value } });
    setSumOfPoints(userId);
};
const saveSoundtracksLikesPoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.soundtrackLikes': value } });
    setSumOfPoints(userId);
};
const saveAccountTimePoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.accountTime': value } });
    setSumOfPoints(userId);
};
const saveAnimeOnTopPoints = async (userId: string, value: number) => {
    await User.updateOne({ _id: userId }, { $set: { 'points.animeOnTop': value } });
    setSumOfPoints(userId);
};

export async function setWatchedAnimePoints(userId: string) {
    try {
        const user = await getUser(userId);
        const watchedAnime = user.userAnimeData.watched.length;
        if (watchedAnime < 5) {
            saveWatchedAnimePoints(userId, 0);
            setAchievement(userId, 0, 'Koneser Świata Anime');
        } else if (watchedAnime < 20) {
            saveWatchedAnimePoints(userId, 5);
            setAchievement(userId, 1, 'Koneser Świata Anime')
        } else if (watchedAnime < 50) {
            saveWatchedAnimePoints(userId, 10);
            setAchievement(userId, 2, 'Koneser Świata Anime')
        } else if (watchedAnime < 75) {
            saveWatchedAnimePoints(userId, 15);
            setAchievement(userId, 3, 'Koneser Świata Anime')
        } else if (watchedAnime < 100) {
            saveWatchedAnimePoints(userId, 20);
            setAchievement(userId, 4, 'Koneser Świata Anime')
        } else if (watchedAnime >= 100) {
            saveWatchedAnimePoints(userId, 25);
            setAchievement(userId, 5, 'Koneser Świata Anime')
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setCommentsPoints(userId: string) {
    try {
        const animeList = await getAnimeList();
        let shortComments = 0;
        let longComments = 0;
        for (const { comments } of animeList) {
            const userComments = comments.filter(c => c.user.toString() === userId);
            for (const { text } of userComments) {
                if (text.length < 2000) {
                    shortComments++;
                } else {
                    shortComments++;
                    longComments++;
                }
            }
        }

        let points = 0;

        if (shortComments < 10) {
            setAchievement(userId, 0, 'Doborowy Dyskutant');
        } else if (shortComments < 50) {
            points += 4;
            setAchievement(userId, 1, 'Doborowy Dyskutant');
        } else if (shortComments < 100) {
            points += 8;
            setAchievement(userId, 2, 'Doborowy Dyskutant');
        } else if (shortComments < 500) {
            points += 12;
            setAchievement(userId, 3, 'Doborowy Dyskutant');
        } else if (shortComments < 1000) {
            points += 20;
            setAchievement(userId, 4, 'Doborowy Dyskutant');
        } else if (shortComments >= 1000) {
            points += 30;
            setAchievement(userId, 5, 'Doborowy Dyskutant');
        }

        if (longComments < 2) {
            setAchievement(userId, 0, 'Prawdziwy Krytyk');
        } else if (longComments < 5) {
            points += 10;
            setAchievement(userId, 1, 'Prawdziwy Krytyk');
        } else if (longComments < 10) {
            points += 20;
            setAchievement(userId, 2, 'Prawdziwy Krytyk');
        } else if (longComments < 20) {
            points += 30;
            setAchievement(userId, 3, 'Prawdziwy Krytyk');
        } else if (longComments < 50) {
            points += 50;
            setAchievement(userId, 4, 'Prawdziwy Krytyk');
        } else if (longComments >= 50) {
            points += 100;
            setAchievement(userId, 5, 'Prawdziwy Krytyk');
        }
        return saveCommentsPoints(userId, points);
    } catch (e) {
        console.error(e.message);
    }
};

export async function setDescriptionsPoints(userId: string) {
    try {
        const animeList = await getAnimeList();
        const descriptions = animeList.reduce((d, a) => a.description.author.toString() === userId ? d += 1 : d, 0);
        if (descriptions < 1) {
            saveDescriptionsPoints(userId, 0);
            setAchievement(userId, 0, 'Prawdziwy Recenzent');
        } else if (descriptions < 3) {
            saveDescriptionsPoints(userId, 10);
            setAchievement(userId, 1, 'Prawdziwy Recenzent');
        } else if (descriptions < 5) {
            saveDescriptionsPoints(userId, 30);
            setAchievement(userId, 2, 'Prawdziwy Recenzent');
        } else if (descriptions < 10) {
            saveDescriptionsPoints(userId, 75);
            setAchievement(userId, 3, 'Prawdziwy Recenzent');
        } else if (descriptions < 25) {
            saveDescriptionsPoints(userId, 225);
            setAchievement(userId, 4, 'Prawdziwy Recenzent');
        } else if (descriptions >= 25) {
            saveDescriptionsPoints(userId, 550);
            setAchievement(userId, 5, 'Prawdziwy Recenzent');
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setProfilesLikesPoints(userId: string) {
    try {
        const users = await getUsers();
        const usersLikes = users.map(u => u.likes.map(l => l.toString()));
        const likes = usersLikes.reduce((p, a) => a.findIndex(l => l === userId) !== -1 ? p + 1 : p, 0);
        if (likes < 1) {
            saveProfilesLikesPoints(userId, 0);
            setAchievement(userId, 0, 'Dusza Towarzystwa');
        } else if (likes < 5) {
            saveProfilesLikesPoints(userId, 1);
            setAchievement(userId, 1, 'Dusza Towarzystwa');
        } else if (likes < 10) {
            saveProfilesLikesPoints(userId, 2);
            setAchievement(userId, 2, 'Dusza Towarzystwa');
        } else if (likes < 25) {
            saveProfilesLikesPoints(userId, 5);
            setAchievement(userId, 3, 'Dusza Towarzystwa');
        } else if (likes < 50) {
            saveProfilesLikesPoints(userId, 10);
            setAchievement(userId, 4, 'Dusza Towarzystwa');
        } else if (likes >= 50) {
            saveProfilesLikesPoints(userId, 20);
            setAchievement(userId, 5, 'Dusza Towarzystwa');
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setSoundtracksPoints(userId: string) {
    try {
        const anime = await Anime.find().select('soundtracks') as AnimeAPI[];
        const soundtracks = anime.reduce((p, a) => [...p, ...a.soundtracks], [] as Soundtrack[]);
        const likes = soundtracks.reduce((l, s) => {
            const likeIndex = s.likes.findIndex(l => l.toString() === userId);
            if (likeIndex !== -1) return l += 1;
            return l;
        }, 0);
        if (likes < 10) {
            saveSoundtracksLikesPoints(userId, 0);
            setAchievement(userId, 0, 'Muzyczny Świr');
        } else if (likes < 25) {
            saveSoundtracksLikesPoints(userId, 1);
            setAchievement(userId, 1, 'Muzyczny Świr');
        } else if (likes < 50) {
            saveSoundtracksLikesPoints(userId, 3);
            setAchievement(userId, 2, 'Muzyczny Świr');
        } else if (likes < 75) {
            saveSoundtracksLikesPoints(userId, 5);
            setAchievement(userId, 3, 'Muzyczny Świr');
        } else if (likes < 100) {
            saveSoundtracksLikesPoints(userId, 10);
            setAchievement(userId, 4, 'Muzyczny Świr');
        } else if (likes >= 100) {
            saveSoundtracksLikesPoints(userId, 15);
            setAchievement(userId, 5, 'Muzyczny Świr');
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setAccountTimePoints() {
    try {
        const users = await User.find().select('createdAt');
        for (const { _id: userId, createdAt } of users) {
            const days = differenceInCalendarDays(Date.now(), createdAt);
            if (days < 7) {
                saveAccountTimePoints(userId, 0);
                setAchievement(userId, 0, 'Prawdziwy Obywatel AniMark.pl');
            } else if (days < 30) {
                saveAccountTimePoints(userId, 1);
                setAchievement(userId, 1, 'Prawdziwy Obywatel AniMark.pl');
            } else if (days < 183) {
                saveAccountTimePoints(userId, 5);
                setAchievement(userId, 2, 'Prawdziwy Obywatel AniMark.pl');
            } else if (days < 366) {
                saveAccountTimePoints(userId, 10);
                setAchievement(userId, 3, 'Prawdziwy Obywatel AniMark.pl');
            } else if (days < 732) {
                saveAccountTimePoints(userId, 30);
                setAchievement(userId, 4, 'Prawdziwy Obywatel AniMark.pl');
            } else if (days < 732) {
                saveAccountTimePoints(userId, 100);
                setAchievement(userId, 5, 'Prawdziwy Obywatel AniMark.pl');
            }
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setAOTPoints(userId: string) {
    try {
        const aots = await getAnimeOnTops();
        let allVotes: string[] = [];
        for (const { votes } of aots) {
            console.log();
            for (const v of votes) {
                allVotes = [...allVotes, ...v.votes];
            }
        }
        const userVotes = allVotes.filter(v => v.toString() === userId).length;
        if (userVotes < 1) {
            saveAnimeOnTopPoints(userId, 0);
            setAchievement(userId, 0, 'Postaw na Swoje');
        } else if (userVotes < 5) {
            saveAnimeOnTopPoints(userId, 1);
            setAchievement(userId, 1, 'Postaw na Swoje');
        } else if (userVotes < 10) {
            saveAnimeOnTopPoints(userId, 5);
            setAchievement(userId, 2, 'Postaw na Swoje');
        } else if (userVotes < 20) {
            saveAnimeOnTopPoints(userId, 10);
            setAchievement(userId, 3, 'Postaw na Swoje');
        } else if (userVotes < 50) {
            saveAnimeOnTopPoints(userId, 20);
            setAchievement(userId, 4, 'Postaw na Swoje');
        } else if (userVotes >= 50) {
            saveAnimeOnTopPoints(userId, 50);
            setAchievement(userId, 5, 'Postaw na Swoje');
        }
    } catch (e) {
        console.error(e.message);
    }
};

export async function setWTMPoints(userId: string, value: number) {
    try {
        await User.updateOne({ _id: userId }, { $inc: { 'points.whatsTheMelody': value } });
        setSumOfPoints(userId);
        setWTMAchievement(userId);
    } catch (e) {
        console.error(e.message);
    }
};