
import { createProject } from '../actions'

export default function NewProjectPage() {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Create a new project
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Start a new project by entering a name below.</p>
                </div>
                <form action={createProject} className="mt-5 sm:flex sm:items-center">
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="name" className="sr-only">
                            Project Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                            placeholder="My Awesome Project"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}
