import { Ionicons } from "@expo/vector-icons";
import { Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import { Pressable } from "react-native";

import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatbotScreen() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const navigation = useNavigation()

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello! 👋 I'm your Gemini AI assistant. How can I help you?",
                createdAt: new Date(),
                user: { _id: 2, name: "Gemini" },
            },
        ]);
    }, []);

    const onSend = useCallback(async (newMessages = []) => {
        setMessages((prev) => GiftedChat.append(prev, newMessages));

        const userMessage = newMessages[0].text;

        setIsTyping(true);

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=AIzaSyBWFwkbpHbuE3iA5LUfcnC9exOJeiD8OcE",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: userMessage }],
                            },
                        ],
                    }),
                }
            );

            console.log(response)
            const data = await response.json();

            const botText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't understand that.";

            const reply = {
                _id: Math.random(),
                text: botText,
                createdAt: new Date(),
                user: { _id: 2, name: "Gemini" },
            };

            setTimeout(() => {
                setMessages((prev) => GiftedChat.append(prev, [reply]));
                setIsTyping(false);
            }, 600);
        } catch (err) {
            console.log("Gemini error: ", err);
            setIsTyping(false);
        }
    }, []);


    return (
        <View style={{ height: "100%" }}>
            <View style={{ height: "10%", backgroundColor: "#475E3E", flexDirection: "row", alignItems: "flex-end",paddingBottom:10 }}>
                <View style={{ width: "33%" }}>
                    <Pressable onPress={()=> navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color={"#fff"} />
                    </Pressable>
                </View>
                <View style={{ width: "40%" }}>
                    <Text size="md" color={"#fff"}>Chat Help Center AI</Text>
                </View>
                <View style={{ width: "20%" }}>
                </View>


            </View >
            <GiftedChat
                messages={messages}
                onSend={(m) => onSend(m)}
                user={{ _id: 1 }}
                placeholder="Ask something..."
                isTyping={isTyping}
                alwaysShowSend
            />
        </View >
    );
}
