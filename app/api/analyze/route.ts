import { NextRequest } from "next/server";

type Idea = {
  title: string;
  description: string;
  budget: string;
  timeline: string;
};

const IDEA_BANK: Record<string, Idea[]> = {
  cafe: [
    {
      title: "AI-ассистент в Telegram для приёма заказов",
      description:
        "Автоматически принимает заказы круглосуточно, отвечает на частые вопросы (часы работы, адрес, меню), эскалирует сложные кейсы вам. Интегрируется с кассой через API.",
      budget: "120 000 – 180 000 ₽",
      timeline: "2–3 недели",
    },
    {
      title: "Автоматизация учёта смен и списаний",
      description:
        "Агент собирает данные из Google Sheets, формирует ежедневный отчёт по выручке и списаниям, отправляет вам в Telegram утром. Подсвечивает аномалии.",
      budget: "80 000 – 140 000 ₽",
      timeline: "1–2 недели",
    },
    {
      title: "Умная рассылка для постоянных гостей",
      description:
        "Агент анализирует историю заказов, сегментирует гостей и отправляет персонализированные предложения в Telegram. −40% нагрузки на SMM.",
      budget: "60 000 – 100 000 ₽",
      timeline: "1 неделя",
    },
  ],
  shop: [
    {
      title: "AI-бот поддержки для интернет-магазина",
      description:
        "Автоматически отвечает на вопросы «где заказ», «какой размер», «как вернуть». Подключается к вашей CRM и курьерской службе. −70% нагрузки на оператора.",
      budget: "150 000 – 220 000 ₽",
      timeline: "2–3 недели",
    },
    {
      title: "Автогенерация описаний товаров",
      description:
        "Агент пишет SEO-оптимизированные описания, alt-теги, мета-данные для новых товаров. Экономит 3–4 часа на каждые 100 позиций.",
      budget: "90 000 – 150 000 ₽",
      timeline: "1–2 недели",
    },
    {
      title: "Возвраты на автомате",
      description:
        "Агент обрабатывает запросы на возврат: проверяет условия, формирует документы, отправляет клиенту инструкцию и курьерскую наклейку.",
      budget: "110 000 – 170 000 ₽",
      timeline: "2 недели",
    },
  ],
  agency: [
    {
      title: "Автосборка клиентских отчётов",
      description:
        "Агент ежемесячно собирает данные из Яндекс.Метрики, Facebook Ads, Google Analytics и формирует визуальные отчёты в Notion/Google Docs. 2 дня в месяц на клиента → 10 минут.",
      budget: "180 000 – 260 000 ₽",
      timeline: "3–4 недели",
    },
    {
      title: "AI-ассистент для менеджеров",
      description:
        "Встроенный в CRM агент отвечает на вопросы по проектам, готовит черновики писем клиентам, подсказывает next action. Экономит 6–8 часов на менеджера в неделю.",
      budget: "140 000 – 200 000 ₽",
      timeline: "2–3 недели",
    },
    {
      title: "Лид-скоринг и приоритизация",
      description:
        "Агент оценивает входящие заявки по 12 параметрам, автоматически назначает менеджера и создаёт карточку в CRM. Рост конверсии входящих до 25%.",
      budget: "120 000 – 180 000 ₽",
      timeline: "2 недели",
    },
  ],
  default: [
    {
      title: "AI-агент первичной обработки заявок",
      description:
        "Круглосуточно отвечает на первичные обращения, квалифицирует лида, собирает контакты и суть задачи, передаёт в вашу CRM. Работает в Telegram, на сайте и по email.",
      budget: "120 000 – 180 000 ₽",
      timeline: "2–3 недели",
    },
    {
      title: "Автоматизация внутренней рутины",
      description:
        "Агент собирает данные из ваших таблиц и инструментов, формирует отчёты, ставит задачи по расписанию, напоминает о дедлайнах. Освобождает 15–20 часов в неделю.",
      budget: "100 000 – 160 000 ₽",
      timeline: "2 недели",
    },
    {
      title: "База знаний с AI-поиском",
      description:
        "RAG-система на ваших документах: инструкции, регламенты, переписка. Сотрудники задают вопрос — агент отвечает со ссылкой на источник. Онбординг за день.",
      budget: "90 000 – 150 000 ₽",
      timeline: "1–2 недели",
    },
  ],
};

function pickIdeas(description: string): Idea[] {
  const lower = description.toLowerCase();
  if (/(кофейн|кафе|ресторан|бар|пекарн|кухн|заведен)/i.test(lower)) {
    return IDEA_BANK.cafe;
  }
  if (/(магазин|shop|e-?commerce|wildberries|ozon|товар|заказ|склад|доставк)/i.test(lower)) {
    return IDEA_BANK.shop;
  }
  if (/(агентств|маркетинг|клиент на ретейнер|реклам|smm|трафик|контракт)/i.test(lower)) {
    return IDEA_BANK.agency;
  }
  return IDEA_BANK.default;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const description: string = body?.businessDescription || "";

    if (typeof description !== "string" || description.length < 15) {
      return new Response(
        JSON.stringify({ error: "Опишите бизнес подробнее (минимум 15 символов)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (description.length > 500) {
      return new Response(
        JSON.stringify({ error: "Максимум 500 символов." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const ideas = pickIdeas(description);
    const payload = JSON.stringify({ ideas });

    // Pseudo-streaming: chunked response for terminal-style typing feel
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const chunks: string[] = [];
        // Chunk payload into ~18-char pieces
        for (let i = 0; i < payload.length; i += 18) {
          chunks.push(payload.slice(i, i + 18));
        }
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          await new Promise((r) => setTimeout(r, 22));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
