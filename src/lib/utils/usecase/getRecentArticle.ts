import { ghostAdaptor } from "$lib/utlis/adaptor/ghostAdaptor";

export const getRecentArticle = await ghostAdaptor.posts
    .browse({
        limit: 10,
    })
    .catch((err) => {
        console.error(err);
    });
