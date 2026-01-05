
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()
    console.log('login button clicked')

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/projects/new')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const emailRaw = formData.get("email")
    const passwordRaw = formData.get("password")

    // 型安全に文字列へ
    const email = typeof emailRaw === "string" ? emailRaw : ""
    const password = typeof passwordRaw === "string" ? passwordRaw : ""

    // ここが超重要：見えない文字を可視化
    console.log("email(JSON):", JSON.stringify(email))
    console.log("email(len):", email.length)
    console.log("password(len):", password.length)

    // ✅ 対策：最低限の正規化
    const normalizedEmail = email.trim().toLowerCase()

    const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
    })

    console.log("signUp data:", data)
    console.log("signUp error:", error)

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    // session が null なら「メール確認待ち」
    if (!data.session) {
        redirect("/login?error=" + encodeURIComponent("Check your email to confirm, then sign in."))
    }

    revalidatePath('/', 'layout')
    redirect('/projects/new')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
