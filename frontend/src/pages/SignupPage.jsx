import { useState } from "react"
import AuthImagePattern from "../components/AuthImagePattern"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Phone, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
export default function SignupPage() {
  const [showPassword , setShowPassword] = useState(false)
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('')
  const {signup} = useAuthStore();
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault();
      if( signup({username:name , email , password , mobileNumber : phoneNumber  }))
      navigate("/")
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2" >
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 ">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6" >
            <div className="form-control">
              <label className="label"
              >
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  onChange={(e)=>  setName(e.target.value)}
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Your Name"
                  />
              </div>
            </div>
{/* full name done */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  onChange={(e)=>  setEmail(e.target.value)}

                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            {/* email dome */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="flex">
                <Phone className="size-5 text-base-content/40" /> 
                </div>
                </div>
                <input
                  onChange={(e)=>  setPhoneNumber(e.target.value)}

                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="+91 XXXX-XXX-XXX"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  onChange={(e)=>  setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="*******"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* password done! */}
            <button className="btn btn-primary w-full " >
                Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60" >
            Already have an account?{" "}</p>
            <Link to="/login" className="link link-primary" >Sign In</Link>
          </div>
        </div>
      </div>
      <AuthImagePattern title ="Join our Community"
      subtitle = "Connect with friends, share moments, and stay in touch with your friends!" />
    </div>
  )
}
  