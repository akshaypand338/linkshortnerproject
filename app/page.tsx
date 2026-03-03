import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from './components/auth-buttons';
import {
  Zap,
  BarChart3,
  Lock,
  Share2,
  Clock,
  Settings,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default async function HomePage() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Shorten URLs,
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Amplify Reach
            </span>
          </h1>
          <p className="mb-8 text-xl text-slate-300">
            Create, track, and manage short links with powerful analytics.
            Perfect for marketing campaigns, social media, and sharing.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <SignUpButton />
            <SignInButton />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-4xl font-bold text-white">
            Powerful Features
          </h2>
          <p className="mb-16 text-center text-lg text-slate-400">
            Everything you need to grow your links and track your success
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Instant Shortening
              </h3>
              <p className="text-slate-300">
                Convert long URLs into clean, memorable short links in seconds.
                No complicated setup required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10">
                <BarChart3 className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Analytics & Insights
              </h3>
              <p className="text-slate-300">
                Track clicks, geographic data, and referrer information in
                real-time. Understand your audience better.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Lock className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Secure & Reliable
              </h3>
              <p className="text-slate-300">
                Enterprise-grade security with SSL encryption, custom domains,
                and expiring links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <Share2 className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Easy Sharing
              </h3>
              <p className="text-slate-300">
                One-click copy to clipboard and built-in QR codes. Share your
                links everywhere.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Schedule & Expiry
              </h3>
              <p className="text-slate-300">
                Set link expiration dates and schedule activation. Perfect for
                limited-time campaigns.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 transition-all hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                <Settings className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Customization
              </h3>
              <p className="text-slate-300">
                Customize your short links with branded domains and custom
                slugs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            How It Works
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Paste Your URL
                </h3>
                <p className="text-slate-300">
                  Come to our dashboard and paste the long URL you want to
                  shorten.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-500">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Generate Short Link
                </h3>
                <p className="text-slate-300">
                  Click generate and instantly get a short, shareable link ready
                  to use.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Share & Track
                </h3>
                <p className="text-slate-300">
                  Share your link everywhere and watch the analytics roll in
                  real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-12">
            <h2 className="mb-8 text-3xl font-bold text-white">
              Why Choose LinkShortener?
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-white">
                    Lightning Fast
                  </h4>
                  <p className="text-sm text-slate-300">
                    Optimize your links for maximum performance and SEO.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-white">
                    Always Reliable
                  </h4>
                  <p className="text-sm text-slate-300">
                    99.9% uptime guarantee with global CDN.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-white">
                    Privacy First
                  </h4>
                  <p className="text-sm text-slate-300">
                    Your data is encrypted and never shared with third parties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald-400" />
                <div>
                  <h4 className="font-semibold text-white">
                    Team Collaborate
                  </h4>
                  <p className="text-sm text-slate-300">
                    Manage links across your entire team with role-based access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Join thousands of marketers and creators who are already shortening
            their links.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <SignUpButton />
            <SignInButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-slate-400">
              © 2026 LinkShortener. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
