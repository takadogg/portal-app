
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const name = formData.get('name') as string

    if (!name) {
        throw new Error('Project name is required')
    }

    const { data, error } = await supabase
        .from('projects')
        .insert({
            name,
            owner_id: user.id,
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/projects')
    redirect(`/projects/${data.id}`)
}
