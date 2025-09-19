import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Container } from "../Components/index"; // adjust path if different

function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Contact form submitted:", data);
        // 👉 here you can call Appwrite/EmailJS/API
        alert("Message sent successfully!");
        reset();
    };

    return (
        <Container>
            <div className=" py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto  p-6  bg-[#0000004c] shadow rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}

                        {/* Email */}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        {/* Message */}
                        <div>
                            <label className="block text-gray-700 mb-1">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Enter your message"
                                className="w-full p-2 border rounded focus:outline-blue-500"
                                {...register("message", { required: "Message is required" })}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default Contact;
