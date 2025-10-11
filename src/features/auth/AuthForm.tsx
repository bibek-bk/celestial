
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/shared/hooks/useAuth'



export default function AuthForm() {
  const { isAuthenticated } = useAuth()
  

  if (!isAuthenticated) {
    return (
      <div className=' w-sm  p-10  rounded-2xl '>
        
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
          providers={['google']}
          redirectTo={window.location.origin}
          localization={{
            variables: {
              forgotten_password: {
                link_text: undefined,
              },
            },
          }}
        />

      </div>
    )
  }
 
}