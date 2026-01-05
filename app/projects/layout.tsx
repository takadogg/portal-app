
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '@/app/login/actions'

export default async function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{user.email}</span>
                        <form action={signout}>
                            <button
                                type="submit"
                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    )
}
