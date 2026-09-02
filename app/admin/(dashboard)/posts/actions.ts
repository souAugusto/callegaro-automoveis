'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addPost, updatePost, deletePost, type Post } from '@/lib/data'

export interface PostFormState {
  error?: string
}

function parsePostInput(formData: FormData): Omit<Post, 'id' | 'slug'> | { error: string } {
  const title = String(formData.get('title') || '').trim()
  const excerpt = String(formData.get('excerpt') || '').trim()
  const cover = String(formData.get('cover') || '').trim()
  const author = String(formData.get('author') || '').trim()
  const dateInput = String(formData.get('date') || '')
  const content = String(formData.get('content') || '').trim()

  if (!title || !excerpt || !author || !content) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }

  const date = dateInput ? new Date(dateInput).toISOString() : new Date().toISOString()

  return {
    title,
    excerpt,
    cover: cover || '/placeholder.svg',
    author,
    date,
    content,
  }
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const input = parsePostInput(formData)
  if ('error' in input) return input

  addPost(input)
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  redirect('/admin/posts')
}

export async function updatePostAction(
  id: string,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const input = parsePostInput(formData)
  if ('error' in input) return input

  updatePost(id, input)
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  redirect('/admin/posts')
}

export async function removePost(formData: FormData) {
  const id = String(formData.get('id') || '')
  deletePost(id)
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath('/admin')
}
