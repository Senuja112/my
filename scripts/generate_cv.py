from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    Flowable,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_PUBLIC = ROOT / "public" / "cv" / "induwara-hasaranga-cv.pdf"
OUT_OUTPUT = ROOT / "output" / "pdf" / "induwara-hasaranga-cv.pdf"


class SidebarDocTemplate(SimpleDocTemplate):
    def _draw_sidebar(self, canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(colors.HexColor("#f04b32"))
        canvas.rect(0, 0, 0.42 * inch, letter[1], stroke=0, fill=1)
        canvas.restoreState()

    def handle_pageBegin(self):
        super().handle_pageBegin()
        self._draw_sidebar(self.canv, self)


class LinkLine(Flowable):
    def __init__(self, parts, font_name="Helvetica-Bold", font_size=10.5, color="#111111", link_color="#9b4c74"):
        super().__init__()
        self.parts = parts
        self.font_name = font_name
        self.font_size = font_size
        self.color = colors.HexColor(color)
        self.link_color = colors.HexColor(link_color)
        self.height = font_size + 5

    def wrap(self, availWidth, availHeight):
        return availWidth, self.height

    def draw(self):
        x = 0
        y = 2
        for part in self.parts:
            text = part["text"]
            url = part.get("url")
            color = self.link_color if url else self.color
            self.canv.setFont(self.font_name, self.font_size)
            self.canv.setFillColor(color)
            self.canv.drawString(x, y, text)
            width = stringWidth(text, self.font_name, self.font_size)
            if url:
                self.canv.setStrokeColor(color)
                self.canv.setLineWidth(0.6)
                self.canv.line(x, y - 1.5, x + width, y - 1.5)
                self.canv.linkURL(url, (x, y - 3, x + width, y + self.font_size), relative=1)
            x += width


def styles():
    sample = getSampleStyleSheet()
    base = ParagraphStyle(
        "Base",
        parent=sample["Normal"],
        fontName="Helvetica",
        fontSize=10.4,
        leading=13.4,
        textColor=colors.HexColor("#444444"),
        spaceAfter=4,
        alignment=TA_LEFT,
    )
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base,
            fontName="Helvetica-Bold",
            fontSize=35,
            leading=39,
            textColor=colors.black,
            spaceAfter=10,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base,
            fontName="Helvetica-Bold",
            fontSize=16,
            leading=19,
            textColor=colors.black,
            spaceBefore=12,
            spaceAfter=8,
        ),
        "sub": ParagraphStyle(
            "Sub",
            parent=base,
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=14,
            textColor=colors.HexColor("#333333"),
            spaceBefore=3,
            spaceAfter=1,
        ),
        "body": base,
        "small": ParagraphStyle(
            "Small",
            parent=base,
            fontSize=9.8,
            leading=12.4,
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base,
            leftIndent=16,
            firstLineIndent=0,
            fontSize=9.8,
            leading=12.4,
            spaceAfter=2,
        ),
    }


def bullets(items, style):
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=0) for item in items],
        bulletType="bullet",
        start="circle",
        bulletFontName="Helvetica",
        bulletFontSize=7,
        leftIndent=18,
        bulletIndent=4,
    )


def plain_lines(story, items, style):
    for item in items:
        story.append(Paragraph(item, style))


def section(story, title, st):
    story.append(Paragraph(title, st["section"]))


def build(path):
    st = styles()
    doc = SidebarDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.55 * inch,
    )
    story = []

    story.append(Paragraph("INDUWARA HASARANGA", st["name"]))
    story.append(
        LinkLine(
            [
                {"text": "Colombo, Sri Lanka | (+94) 76 4948321 | induhasaranga@gmail.com | "},
                {"text": "induwarahasaranga.me", "url": "https://induwarahasaranga.me"},
            ]
        )
    )
    story.append(
        LinkLine(
            [
                {"text": "LinkedIn", "url": "https://www.linkedin.com/in/induwarahasaranga/"},
                {"text": " | "},
                {"text": "GitHub", "url": "https://github.com/clyuu"},
            ]
        )
    )
    story.append(Spacer(1, 16))

    summary = (
        "AI & ML Engineer and Full Stack Developer with a strong foundation in software development, artificial "
        "intelligence, modern web technologies, API integration, and database driven systems. Experienced in "
        "developing responsive web applications, AI chatbot solutions, business software, and practical digital "
        "products that solve real world problems. Skilled at combining clean user interfaces, scalable backend "
        "logic, and intelligent automation to build efficient, user focused, and impactful technology solutions."
    )
    story.append(Paragraph(summary, st["body"]))

    section(story, "EDUCATION", st)
    story.append(Paragraph("BEng (Hons) in Software Engineering", st["sub"]))
    story.append(Paragraph("London Metropolitan University (UK)", st["body"]))
    story.append(Paragraph("Completed: September 2026", st["body"]))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Pearson BTEC Level 5 HND in Computing", st["sub"]))
    story.append(Paragraph("Esoft Metro Campus", st["body"]))
    story.append(Paragraph("Completed: Sep 2025", st["body"]))

    section(story, "EXPERIENCE", st)
    story.append(Paragraph("Software Engineer Intern", st["sub"]))
    story.append(Paragraph("Medcube USA LLC | Colombo, Western Province, Sri Lanka | On-site | Sep 2025 - May 2026", st["body"]))
    plain_lines(
        story,
        [
            "Completed a software engineering internship contributing to full-stack application work using Angular and .NET Framework.",
            "Supported development, debugging, UI implementation, API integration, and team collaboration across real-world software tasks.",
            "Applied engineering practices across frontend, backend, and database-connected application workflows.",
        ],
        st["bullet"],
    )

    section(story, "SKILLS", st)
    plain_lines(
        story,
        [
            "<b>Programming Languages:</b> C#, Python, Java, PHP, HTML, JavaScript, TypeScript",
            "<b>Frameworks & Technologies:</b> Node.js, ASP.NET, .NET Framework, React, Next.js, Angular, Bootstrap, Flask",
            "<b>AI & Chatbots:</b> AI/ML concepts, LLM integration, prompt engineering, Sinhala chatbot flows, AI product prototyping",
            "<b>Databases:</b> MS SQL Server, MySQL, realtime database-driven responses",
            "<b>Tools & Platforms:</b> Git, Visual Studio, VS Code, Postman, DigitalOcean VPS, Cloudflare SSL, LAMP Stack",
            "<b>Knowledge of:</b> OOP, Data Structures & Algorithms, RESTful API concepts, full-stack architecture",
        ],
        st["bullet"],
    )

    story.append(PageBreak())
    section(story, "PROJECTS", st)
    projects = [
        (
            "Qlony Girl - AI Girlfriend Platform",
            [
                "Co-contributed with Kaveesha Lasith to Sri Lanka's first AI girlfriend concept, focusing on interactive AI conversation experiences.",
            ],
        ),
        (
            "Qlony Crypto AI",
            [
                "Co-built a crypto AI concept designed to analyze market news and realtime signals to support trade-signal insights.",
            ],
        ),
        (
            "Sinhala Business Chatbot",
            [
                "Built with Kaveesha Lasith to convert sales in Sinhala, answer from databases in realtime, and handle customers through the order process.",
            ],
        ),
        (
            "Multi-Branch Restaurant Management System (Desktop to Web Evolution)",
            [
                "Evolved a standalone C# desktop POS into a full-stack, multi-user web portal with role-based dashboards and real-time order tracking.",
            ],
        ),
        (
            "Emergency Medical Response Portal",
            [
                "Developed a health-tech platform giving first responders instant access to patient medical data through scannable QR codes.",
            ],
        ),
    ]
    for title, items in projects:
        story.append(Paragraph(title, st["sub"]))
        plain_lines(story, items, st["bullet"])

    doc.build(story)


def main():
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    build(OUT_PUBLIC)
    build(OUT_OUTPUT)
    print(OUT_PUBLIC)
    print(OUT_OUTPUT)


if __name__ == "__main__":
    main()
