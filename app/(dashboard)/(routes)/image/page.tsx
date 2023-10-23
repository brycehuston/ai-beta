"use client";

import { useRouter } from "next/router";
import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Code, Download, ImageIcon, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import OpenAI from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string }) => image.url);
            setImages(urls);

            setImages(urls)
            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.reload();
        }
    };

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompted into a image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-2
                            "
                        >
                            {/* ... rest of your form code */}
                            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated." />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden"
                            >
                                {/* Fixed missing '>' and 'layout' prop for Image component */}
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Image"
                                        layout="fill"  
                                        src={src}
                                    />
                                </div>
                                {/* Fixed typo in 'className' and missing '>' in Button component */}
                                <CardFooter className="p-2">
                                    <Button
                                    onClick={() => window.open(src)}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage;
