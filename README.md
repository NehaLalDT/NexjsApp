# Audit Project Upload – MVP

## Overview

This project is a **Minimum Viable Product (MVP)** that allows users to create and upload audit projects through a web interface.

The system enables users to submit project details and upload a **PDF document**. The uploaded file is securely stored in cloud storage, while the project information is saved in a database.

This MVP demonstrates the **core workflow of project creation and file upload**.

---

## Technology Stack

| Technology | Version          |
| ---------- | ---------------- |
| Node.js    | v20.19.0         |
| Next.js    | 16.1.6           |
| Database   | Supabase         |
| Storage    | Supabase Storage |


# Environment Setup

Before running the project, create an environment configuration file.

## Step 1 – Create Environment File

Create a file named:

```
.env.local
```

in the **root directory** of the project.

---

## Step 2 – Add Supabase Configuration

Add the following environment variables to the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Example

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Where to Find These Keys

You can get these values from the **Supabase Dashboard**:

1. Open your Supabase project
2. Go to **Project Settings**
3. Select **API**
4. Copy:

   * **Project URL**
   * **Anon Public Key**


```

---

## Getting Started

Follow the steps below to run the project locally.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open the Application

Open the following URL in your browser:

```
http://localhost:3000/new-audit
```

---


## Data Verification (Supabase)

After submitting the **New Audit Project** form, a new record will be created in the Supabase database.

To verify the data:

1. Open your Supabase project dashboard.
2. Navigate to **Table Editor**.
3. Select the **projects** table.
4. You will see the newly created record with:

   * Project Name
   * Project Type
   * Structural System
   * File Path
   * Status (`queued`)
   * Created Timestamp

This confirms that the form submission and file upload were successfully stored in the database.

