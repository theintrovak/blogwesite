import { Container } from '../Components/index'
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    return (
        <Container>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Hero Section */}
                <section className="bg-[#10A4B0] text-white py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        We’re passionate about building modern web apps with clean design and dynamic features.
                    </p>
                </section>

                {/* About Card */}
                <section className="flex justify-center py-12 px-4">
                    <Card className="max-w-3xl shadow-lg rounded-2xl">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
                            <p className="text-gray-700 mb-4">
                                Our mission is to empower developers and businesses with intuitive, scalable, and
                                beautifully designed web solutions. With a strong focus on simplicity and performance,
                                we bring ideas to life with modern technologies like React, Tailwind, and shadcn/ui.
                            </p>
                            <p className="text-gray-700">
                                We believe in collaboration, creativity, and continuous learning. Every project is
                                a chance to grow and deliver real value.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Values Section */}
                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto py-12">
                    <Card className="rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">🚀 Innovation</h3>
                            <p className="text-gray-600">
                                We embrace new ideas and technologies to deliver cutting-edge solutions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">🤝 Collaboration</h3>
                            <p className="text-gray-600">
                                Working together with clients and teams to achieve the best results.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">🌱 Growth</h3>
                            <p className="text-gray-600">
                                Constantly learning and improving to stay ahead in the industry.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Call to Action */}
                <section className="text-center py-12 bg-white shadow-inner">
                    <h2 className="text-2xl font-semibold mb-4">Want to work with us?</h2>
                    <Button className="bg-[#10A4B0] hover:bg-[#0d8790]">
                        Get in Touch
                    </Button>
                </section>
            </div>
        </Container>
    )
}