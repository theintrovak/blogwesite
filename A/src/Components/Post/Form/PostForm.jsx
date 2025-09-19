import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Rte } from '../../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import services from '../../../Appwrite/config'


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { isSubmitting } } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                content: post?.content || '',
                slug: post?.slug || '',
                status: post?.status || "active",
            },
        }
    )
    const navigate = useNavigate()
    const userData = useSelector((state) => state?.auth?.userData)
    const submit = async (data) => {
        if (post) {
            let fileid = post.featuredImage
            if (data.image && data.image[0]) {
                const file = await services.uploadImage(data.image[0]);
                console.log("image uploaded  ", file);
                if (file) {
                    await services.deleteFile(post.featuredImage)
                    console.log(" old image deleted  ", post.featuredImage);
                    fileid = file.$id
                }
            }
            const { image, ...postdata } = data
            const dbpost = await services.updatePost(post.$id, { ...postdata, featuredImage: fileid })
            console.log("post updated  ", dbpost);
            if (dbpost) {
                navigate(`/all-posts`)
            }
        } else {
            const file = await services.uploadImage(data.image[0])
            console.log("image uploaded  ", file);
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId


                const dbpost = await services.createPost({
                    title: data.title,
                    content: data.content,
                    slug: data.slug,
                    featuredImage: data.featuredImage,
                    status: data.status,
                    userId: userData.$id
                })
                console.log("post created  ", dbpost);
                if (dbpost) {
                    console.log("page navigated  ");
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
                            src={services.getFilePreview(post.featuredImage)}
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
                    {post ? (isSubmitting) ? "Updating..." : "Update" : (isSubmitting) ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm