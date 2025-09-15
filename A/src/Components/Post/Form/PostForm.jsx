import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Rte } from '../../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import services from '../../../Appwrite/config'


function PostForm() {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValue: {
                title: post?.title || '',
                content: post?.content || '',
                slug: post?.slug || '',
                status: post?.status || "active",
            },
        }
    )
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? services.uploadImage(data.image[0]) : null
            if (file) {
                services.deleteFile(post.FeaturedImage)

            }
            const dbpost = await services.updatePost(post.$id, { ...data, FeaturedImage: file ? file.$id : undefined })
            if (dbpost) {
                navigate(`/post/${encodeURIComponent(post.$id)}`)
            }
        } else {
            const file = await services.uploadImage(data.image[0])
            if (file) {
                const fileId = file.$id
                data.FeaturedImage = fileId
                const dbpost = await services.createPost(...data, userData.$id)
                if (dbpost) {
                    navigate(`/post/${encodeURIComponent(dbpost.$id)}`)
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        return '';
    }, [])
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => subscription.unsubscribe()
    }, [slugTransform, watch])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm