import { User } from "../models/users";

export const getTimeSpentWithAnime = async (userId: string): Promise<number | null> => {
    const user = await User.findById(userId).select('userAnimeData.watched').populate('userAnimeData.watched.anime', ['info']);
    if (!user) return null;
    let timeSpent = 0;
    for (const { anime } of user.userAnimeData.watched) {
        const { info } = anime as any;
        if (info.duration.includes('odc')) {
            const split = info.duration.split('.');
            const odc = Number(split[0].replace('odc', ''));
            const min = Number(split[1].replace('min', ''));
            timeSpent += odc * min;
        } else {
            const split = info.duration.split('.');
            const godz = Number(split[0].replace('godz', ''));
            const min = Number(split[1].replace('min', ''));
            timeSpent += godz * 60 + min;
        }
    }
    // `${Math.floor(timeSpent / 60)}godz. ${timeSpent % 60}min.`
    return timeSpent;
}