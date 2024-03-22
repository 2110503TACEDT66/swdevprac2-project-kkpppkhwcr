"use client"
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";
// import { supabase } from "../supabase/supabase";

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
// const supabase = createClient("http://localhost:200", "gf")

export default function(){
    return (
        // <></>
        <Auth
            supabaseClient={supabase}   
            providers={[]}
            localization={{
                variables:{
                  sign_in: {
                    email_label: 'Your email address',
                    password_label: 'Your strong password',
                  },
                },
            }}
        ></Auth>
    )
}