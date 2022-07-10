import { Achievement } from "../models/achievements";
import { Anime } from "../models/anime";
import { User } from "../models/users";
import { WhatsTheMelody } from "../models/whatsTheMelody";
import { UserAchievementsAPI, WhatsTheMelodyAPI } from "../types";

const getCurrentAchievements = async (userId: string): Promise<UserAchievementsAPI> => {
    return await User.findById(userId).select('achievements').populate('achievements');
};
const getNewAchievements = async (name: string, level: number) => {
    return await Achievement.find({ $and: [{ name }, { level: { $lte: level } }] }).select('_id');
};
const pullCurrentAchievements = async (userId: string, currentAchievements: string[]) => {
    await User.updateOne({ _id: userId }, { $pull: { achievements: { $in: currentAchievements } } });
};
const pushNewAchievements = async (userId: string, newAchievements: string[]) => {
    await User.updateOne({ _id: userId }, { $push: { achievements: { $each: newAchievements } } });
};

export async function setAchievement(userId: string, level: number, name: string) {
    try {
        const populate = await getCurrentAchievements(userId);
        const currentAchievementsIDs = populate.achievements
            .filter(a => a.name === name)
            .map(a => a._id);
        await pullCurrentAchievements(userId, currentAchievementsIDs);
        const newAchievements = await getNewAchievements(name, level);
        const newAchievementsIDs = newAchievements.map(a => a._id);
        await pushNewAchievements(userId, newAchievementsIDs);
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function setWTMAchievement(userId: string) {
    try {
        const user = await User.findById(userId);
        const points = user.points.whatsTheMelody;
        if (points < 1) {
            setAchievement(userId, 0, 'Jaka To Melodia');
        } else if (points < 10) {
            setAchievement(userId, 1, 'Jaka To Melodia');
        } else if (points < 50) {
            setAchievement(userId, 2, 'Jaka To Melodia');
        } else if (points < 100) {
            setAchievement(userId, 3, 'Jaka To Melodia');
        } else if (points < 500) {
            setAchievement(userId, 4, 'Jaka To Melodia');
        } else if (points >= 500) {
            setAchievement(userId, 5, 'Jaka To Melodia');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function setHaterAchievement(userId: string) {
    try {
        const rates = await Anime.find().select('rate');
        const allRates = [];
        for (const { rate } of rates) {
            for (const single of rate) {
                allRates.push(single);
            }
        }
        const userRates = allRates.filter(r => r.user === userId && r.rate === 1);
        if (userRates.length < 1) {
            setAchievement(userId, 0, 'Hater Animasków');
        } else if (userRates.length < 5) {
            setAchievement(userId, 1, 'Hater Animasków');
        } else if (userRates.length >= 5) {
            setAchievement(userId, 4, 'Hater Animasków');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function setLoverAchievement(userId: string) {
    try {
        const rates = await Anime.find().select('rate');
        const allRates = [];
        for (const { rate } of rates) {
            for (const single of rate) {
                allRates.push(single);
            }
        }
        const userRates = allRates.filter(r => r.user.toString() === userId && r.rate === 10);
        if (userRates.length < 1) {
            setAchievement(userId, 0, 'Lovelas Animasków');
        } else if (userRates.length < 10) {
            setAchievement(userId, 1, 'Lovelas Animasków');
        } else if (userRates.length >= 10) {
            setAchievement(userId, 4, 'Lovelas Animasków');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function setParzydlakAchievement(userId: string) {
    try {
        const wtms = await WhatsTheMelody.find().select('votes').select('correctAnswear') as WhatsTheMelodyAPI[];
        let parzydlakPoints = 0;
        for (const wtm of wtms) {
            let isParzydlak = false;
            for (const votes of wtm.votes) {
                if (votes.title !== wtm.correctAnswear) {
                    const index = votes.votes.findIndex(v => v === userId);
                    if (index !== -1) {
                        isParzydlak = true;
                    }
                }
            }
            if (isParzydlak) {
                parzydlakPoints++;
            }
        }
        if (parzydlakPoints < 1) {
            setAchievement(userId, 0, 'Muzyczny Parzydlak');
        } else if (parzydlakPoints < 5) {
            setAchievement(userId, 1, 'Muzyczny Parzydlak');
        } else if (parzydlakPoints < 10) {
            setAchievement(userId, 2, 'Muzyczny Parzydlak');
        } else if (parzydlakPoints < 20) {
            setAchievement(userId, 3, 'Muzyczny Parzydlak');
        } else if (parzydlakPoints < 50) {
            setAchievement(userId, 4, 'Muzyczny Parzydlak');
        } else if (parzydlakPoints >= 50) {
            setAchievement(userId, 5, 'Muzyczny Parzydlak');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}
