import './index.css'
  import { useState, useEffect } from 'react'
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@supabase/auth-ui-react'
  import { ThemeSupa } from '@supabase/auth-ui-shared'

  const supabase = createClient('https://lswzergcpcnxdfvbypps.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzd3plcmdjcGNueGRmdmJ5cHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1ODcwNjEsImV4cCI6MjA3MzE2MzA2MX0.iOclzH_skSl1akBVsWWfE3XkIm8mAp62vlqF5HAf_9E')

  import type { Session } from '@supabase/supabase-js'

  export default function App() {
    const [session, setSession] = useState<Session | null>(null)

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

    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
      return (<div>Logged in!</div>)
    }
  }