
import { useEffect, useMemo } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'
import { signOut } from '@/services/auth'
import { useAuth } from '@/shared/hooks/useAuth'



export default function AuthForm() {
  const { session, isAuthenticated } = useAuth()
  
  const avatar = useMemo(
    () => session?.user.user_metadata?.avatar_url ?? session?.user.user_metadata?.picture,
    [session]
  )



  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  useEffect(() => {
    // Optionally, could prefetch or side effects when auth changes
  }, [isAuthenticated])

  if (!isAuthenticated) {
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
    return (
      <div>
        Logged in!
        <button className='px-4 py-2 border-white border-2' onClick={handleSignOut}>Sign out</button>
        {avatar && <img src={avatar} alt="User Avatar" />}
      </div>
    )
  }
}