import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* 🔥 Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-teal-700 mb-6">
          About DraftLab
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          DraftLab is built for modern engineering teams to collaborate,
          visualize, and document ideas — all in one powerful workspace.
        </p>
      </section>

      {/* ⚡ Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">
            📝 Markdown Editor
          </h3>
          <p className="text-gray-600">
            Write clean and structured documents with real-time preview and
            formatting support.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">
            🎨 Collaborative Canvas
          </h3>
          <p className="text-gray-600">
            Draw diagrams and brainstorm ideas together with your team in
            real-time.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-teal-600 mb-3">
            ⚙️ Diagram as Code
          </h3>
          <p className="text-gray-600">
            Build and manage diagrams programmatically with version control
            support.
          </p>
        </div>

      </section>

      {/* 🚀 How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-teal-700 mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">

            <div>
              <h4 className="font-semibold text-teal-600 mb-2">
                1. Create Workspace
              </h4>
              <p className="text-gray-600">
                Start by creating a workspace for your project or team.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-teal-600 mb-2">
                2. Collaborate Live
              </h4>
              <p className="text-gray-600">
                Invite teammates and work together in real-time on documents and
                canvas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-teal-600 mb-2">
                3. Build & Share
              </h4>
              <p className="text-gray-600">
                Export, share, and manage your work efficiently with version
                control.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 💡 CTA Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of developers building smarter with DraftLab.
        </p>

        <a
          href="/dashboard"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition"
        >
          Go to Dashboard
        </a>
      </section>

    </div>
  );
}