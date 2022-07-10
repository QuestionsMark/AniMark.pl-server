import { Kind } from "../types";

export const getDuration = (kind: Kind, hours: number, minutes: number, epizodeDuration: number, epizodesCount: number) => {
    switch (kind) {
        case 'series':
            return `${epizodesCount}odc. ${epizodeDuration}min.`;
        case 'movie':
            return `${hours}godz. ${minutes}min.`;
    }
    return;
};