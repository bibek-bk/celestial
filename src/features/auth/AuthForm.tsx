
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { Session } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY )


export default function AuthForm() {
  const [session, setSession] = useState<Session | null>(null)
  console.log(session);
  const avatar = session?.user.user_metadata.avatar_url ?? session?.user.user_metadata.picture;
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
  
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])



  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  if (!session) {
    return (
      <div className=' w-sm border p-10 mx-auto rounded-2xl'>
        {/* <div className='border p-10'> */}
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
          }}
          theme='dark'
          providers={['google', 'apple']}

        />
        {/* </div> */}

      </div>
    )
  }
  else {
    return (<div>
      Logged in!

      <button className='px-4 py-2 border-white border-2' onClick={handleSignOut}>Sign out</button>
      <img src={avatar} alt="User Avatar" />
      </div>)
  }
}