# 💰 Pathways - Financial Simulator for Capital Region Youth

An interactive financial literacy game that lets young people experience 8 years of financial decisions (ages 17-25) in a safe, simulated environment. Built for Capital Region (NY) youth to learn through consequences before facing them in real life.

## 🎯 The Problem

**1 in 3 Capital Region young adults start their adult life in debt** - not because they're irresponsible, but because nobody taught them how money actually works.

Traditional financial literacy education:
- Happens in classrooms, disconnected from real life
- Teaches abstract concepts without context
- Fails when consequences hit months or years later
- Doesn't provide actionable local resources

By the time you learn (credit score damaged, IRS penalties accrued, apartment rejected), **it's too late to undo.**

## ✨ The Solution

**Pathways** creates a safe space to fail at money. Make real financial decisions, see immediate outcomes, then jump forward in time to experience the delayed consequences. After making mistakes, unlock interactive tutorials with step-by-step guidance and real Capital Region resources.

### Key Features

- **7 Diverse Characters**: Retail worker, HVCC student, GlobalFoundries intern, gig worker, and more
- **Realistic Scenarios**: Based on actual Capital Region situations (first paycheck, tax filing, credit cards, car costs)
- **Delayed Consequences**: See how decisions compound over months/years (not just instant feedback)
- **Interactive Tutorials**: Learn practical skills after experiencing consequences (tax filing, credit building)
- **Local Resources**: Every resource is real and Capital Region-specific (SEFCU, VITA tax help at 90 State St Albany, HVCC counseling)
- **Mobile-Responsive**: Works on phones and computers

## 🎮 How It Works

1. **Choose a character** with different starting circumstances
2. **Make decisions** at critical financial moments (ages 17-25)
3. **See immediate outcomes** - what happens right away
4. **Jump forward in time** - experience delayed consequences months/years later
5. **Learn from mistakes** - unlock tutorials with real resources after bad decisions
6. **Replay with knowledge** - try different paths to see better outcomes

## 🛠️ Tech Stack

- **React** (Vite) - Fast, modern frontend framework
- **React Router** - Client-side routing for game flow
- **Tailwind CSS** - Utility-first styling with custom color palette
- **JSON-based narrative system** - Easy to update scenarios and add characters

## 🚀 Setup & Installation

### Prerequisites
- Node.js 16+ and npm

### Run Locally
```bash
# Clone the repository
git clone https://github.com/sjoasil001/pathways-financial-simulator.git
cd pathways-financial-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## 🌟 Character Journeys

Each character represents a different starting point that Capital Region youth face:

- **Maya** (17) - First job at Crossgates Mall, learning to manage paychecks
- **Jordan** (19) - HVCC student working part-time, balancing school and bills
- **Alex** (18) - GlobalFoundries intern, high-paying but complex benefits
- **Eli** (18) - New driver, facing unexpected car costs
- **Casey** (17) - Retail worker, navigating irregular schedules
- **Ria** (18) - DoorDash + babysitting gig worker, dealing with 1099 taxes
- **Noor** (19) - Helping family financially, managing competing priorities

## 💡 Example: Maya's Tax Filing Journey

**Decision (Age 19)**: You receive a W-2 form from Crossgates. File taxes or ignore it?

**If you ignore it:**
- **Immediate**: Nothing happens. Life continues as normal.
- **18 months later (Age 20)**: IRS notice arrives. Your $280 tax bill became $920 (penalties + interest). Bank account frozen.

**Then:** Tutorial unlocks showing:
- Step-by-step how to file taxes using IRS Free File (free)
- Where to get help: VITA Tax Help at 90 State St, Albany (free, in-person)
- What documents you need (W-2, Social Security Number)
- How to avoid this next year

## 📍 Capital Region Focus

All scenarios and resources are hyper-local:

### Real Employers
- Crossgates Mall
- GlobalFoundries
- Local retail and service jobs

### Real Transportation
- CDTA bus system
- Driving to work in Guilderland, Troy, Albany

### Real Resources
- **SEFCU Credit Union** - Financial counseling
- **VITA Tax Help** - 90 State Street, Albany (free)
- **HVCC Financial Aid** - Community college support
- **Albany Public Library** - Free computers and tax forms
- **Whitney Young Health** - Healthcare access

### Real Consequences
- IRS penalties (5% per month, max 25% + 8% annual interest)
- Credit score impact on apartment applications in Troy/Albany
- Overdraft fees and payment cascades
- Employment reliability expectations

## 📚 Educational Philosophy

**Traditional approach fails because:**
- Information is taught before it's relevant
- Abstract concepts don't stick
- No safe place to practice and fail

**Pathways succeeds because:**
- You experience consequences before facing them in real life
- Lessons are contextual and memorable (you felt the IRS penalty)
- Help is always available with actionable, local resources
- You can replay with new knowledge and see different outcomes

## Target Audience

Capital Region youth aged 16-25, especially those:
- Getting their first job
- Starting community college (HVCC, SUNY)
- Moving out on their own
- Facing financial decisions without guidance
- From underserved communities with limited financial education access

## Built For

**NSCH3 Hackathon 2026** - Economic Empowerment Track

Financial literacy is economic empowerment. Small financial decisions compound over years, opening or closing opportunities. Pathways teaches young people how to navigate these decisions before real-world consequences limit their options.

## Design Decisions

### Why Delayed Consequences?
Real life doesn't punish you immediately. Your ignored tax bill doesn't hurt until 18 months later when the IRS freezes your account. We teach cause-and-effect over time, not just instant game mechanics.

### Why Tutorials After Mistakes?
People don't retain information they don't need yet. The tutorial becomes relevant and memorable.
## Future Enhancements

- More characters (college graduates, trade school, military)
- Multiplayer mode (compare decisions with friends)
- Spanish language support (large Latino community in Capital Region)
- Partnership with local schools and nonprofits
- Mobile app version


