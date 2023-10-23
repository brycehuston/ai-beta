"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure
        ("555b638c-2d6b-4d55-a878-22575bd89e5b");
    }, []);

    return null
}