import {useState} from "react";

export default function register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto">
                <input 
                    value={username} 
                    onChange={ev => setUsername(ev.target.value)} 
                    type="text" placeholder="username" 
                    className="block w-full rounded-sm p-2 mb-2 border" />

                <input 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}  
                    type="password" placeholder="password" 
                    className="block w-full rounded-sm p-2 mb-2 border"/>

                <button className="bg-slate-500 text-white block w-full rounded-sm p-2 mb-2">Register</button>
            </form>
        </div>
    );
}