import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Цифровой мастер",
  description:
    "Как я обрабатываю персональные данные, полученные через форму обратной связи и AI-анализатор на сайте.",
  robots: { index: true, follow: true },
};

const UPDATED = "13 апреля 2026";

export default function PrivacyPage() {
  return (
    <main className="relative">
      <Header />

      <section className="relative pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="edge">
          {/* Ledger + back */}
          <div className="flex items-center justify-between mb-10">
            <span className="ledger">§ — политика конфиденциальности</span>
            <Link
              href="/"
              className="ledger hover:text-[var(--color-flame)] transition-colors"
            >
              ← на главную
            </Link>
          </div>

          <h1
            className="kinetic-xl max-w-[16ch]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
          >
            <span className="block">Политика</span>
            <span className="block italic-accent text-[var(--color-flame)]">
              конфиденциальности.
            </span>
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 max-w-[60ch]">
            <div>
              <div className="ledger mb-1">обновлено</div>
              <div className="text-[14px] font-[family-name:var(--font-mono)]">
                {UPDATED}
              </div>
            </div>
            <div>
              <div className="ledger mb-1">действует для</div>
              <div className="text-[14px] font-[family-name:var(--font-mono)]">
                digitalmaster.demo и поддоменов
              </div>
            </div>
          </div>

          <div className="mt-14 rule" />
        </div>
      </section>

      <article className="pb-24 md:pb-36">
        <div className="edge">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_2.15fr] gap-10 lg:gap-20">
            {/* TOC sidebar */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="ledger mb-5">содержание</div>
              <ol className="space-y-2.5 text-[14px] text-[var(--color-ink-2)]">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-baseline gap-3 hover:text-[var(--color-flame)] transition-colors"
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-3)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-10 p-5 squircle bg-[var(--color-paper-2)]">
                <div className="ledger-flame mb-2">коротко</div>
                <p className="text-[13px] leading-[1.6] text-[var(--color-ink-2)]">
                  Я собираю только то, что вы сами отправляете через форму
                  или AI-анализатор. Не продаю данные, не делюсь с рекламными
                  сетями, не храню дольше, чем нужно.
                </p>
              </div>
            </aside>

            {/* Long-form text */}
            <div className="space-y-12 max-w-[68ch]">
              <Section
                id="controller"
                number="01"
                title="Кто обрабатывает данные"
              >
                <P>
                  Оператором персональных данных является{" "}
                  <strong>Марина</strong> (далее — «Цифровой мастер»,
                  «Оператор», «я») — физическое лицо, оказывающее услуги в
                  сфере разработки сайтов, веб-приложений и AI-агентов.
                </P>
                <P>
                  Контакты для запросов по обработке персональных данных:
                </P>
                <ul className="space-y-2 mt-3">
                  <LI>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:demo@aistartup.ru"
                      className="underline underline-offset-4 decoration-[var(--color-rule)] hover:decoration-[var(--color-flame)]"
                    >
                      demo@aistartup.ru
                    </a>
                  </LI>
                  <LI>
                    <strong>Telegram:</strong>{" "}
                    <a
                      href="https://t.me/maribochkareva"
                      className="underline underline-offset-4 decoration-[var(--color-rule)] hover:decoration-[var(--color-flame)]"
                    >
                      @maribochkareva
                    </a>
                  </LI>
                </ul>
                <P>
                  Обработка производится в соответствии с Федеральным законом
                  от 27.07.2006 № 152-ФЗ «О персональных данных» и
                  применимыми требованиями GDPR для посетителей из стран ЕС.
                </P>
              </Section>

              <Section id="what" number="02" title="Какие данные я собираю">
                <P>
                  Сайт собирает только те данные, которые вы осознанно
                  передаёте сами, плюс минимальные технические параметры,
                  необходимые для работы сервиса.
                </P>

                <Subhead>2.1. Форма обратной связи</Subhead>
                <P>Когда вы заполняете форму на странице, я получаю:</P>
                <ul className="space-y-2 mt-3">
                  <LI>Имя (или то, как вы представились)</LI>
                  <LI>Контакт: Telegram-handle, email или номер телефона</LI>
                  <LI>Текст описания вашей задачи</LI>
                  <LI>
                    Дату и время отправки, IP-адрес (сохраняется только в
                    логах сервера на срок до 7 дней)
                  </LI>
                </ul>

                <Subhead>2.2. AI-анализатор бизнеса</Subhead>
                <P>
                  При использовании интерактивного AI-анализатора я получаю
                  текст описания бизнеса, который вы ввели в поле. Этот текст
                  отправляется на сервер для генерации ответа и не связывается
                  с какой-либо персональной учётной записью.
                </P>
                <P>
                  Для защиты от злоупотреблений временно сохраняется ваш
                  IP-адрес с целью ограничения частоты запросов (rate limit —
                  не более 5 запросов в час). Эти данные хранятся в памяти
                  сервера и автоматически удаляются в течение часа.
                </P>
                <P>
                  Содержимое запросов не логируется с привязкой к
                  IP, не используется для обучения моделей и не передаётся
                  третьим лицам вне инфраструктуры LLM-провайдера
                  (см. раздел 5).
                </P>

                <Subhead>2.3. Аналитика посещений</Subhead>
                <P>
                  Сайт использует privacy-friendly аналитику без использования
                  cookie и без сбора идентификаторов. Фиксируются только
                  агрегированные данные: страница, источник перехода,
                  браузер, тип устройства, страна. Эти данные не позволяют
                  идентифицировать конкретного посетителя.
                </P>

                <Subhead>2.4. Что я НЕ собираю</Subhead>
                <ul className="space-y-2 mt-3">
                  <LI>Cookie рекламных сетей и трекеры соцсетей</LI>
                  <LI>Данные геолокации точнее, чем страна</LI>
                  <LI>Биометрические или специальные категории данных</LI>
                  <LI>Платёжную информацию</LI>
                  <LI>Данные о несовершеннолетних (сайт не предназначен для лиц младше 18 лет)</LI>
                </ul>
              </Section>

              <Section id="purpose" number="03" title="Зачем я это делаю">
                <P>Данные используются строго для следующих целей:</P>
                <ul className="space-y-2 mt-3">
                  <LI>
                    <strong>Связь с вами:</strong> ответить на заявку, уточнить детали задачи, согласовать созвон или отправить коммерческое предложение.
                  </LI>
                  <LI>
                    <strong>Работа AI-анализатора:</strong> сформировать ответ на ваш запрос и предотвратить злоупотребления сервисом.
                  </LI>
                  <LI>
                    <strong>Улучшение сайта:</strong> понимать, какие страницы интересны посетителям, и где сайт работает медленно (через агрегированную аналитику).
                  </LI>
                  <LI>
                    <strong>Выполнение обязательств:</strong> если мы начинаем совместный проект — для заключения и исполнения договора.
                  </LI>
                </ul>
                <P>
                  Данные не используются для автоматизированного принятия
                  решений, профилирования или рассылок без отдельного согласия.
                </P>
              </Section>

              <Section id="basis" number="04" title="На каком основании">
                <P>Правовые основания обработки:</P>
                <ul className="space-y-2 mt-3">
                  <LI>
                    <strong>Согласие субъекта</strong> (ст. 6 ч. 1 п. 1 152-ФЗ) — при добровольном заполнении формы или использовании AI-анализатора.
                  </LI>
                  <LI>
                    <strong>Исполнение договора</strong> (ст. 6 ч. 1 п. 5 152-ФЗ) — когда обработка необходима для оказания услуг.
                  </LI>
                  <LI>
                    <strong>Законный интерес</strong> (ст. 6 ч. 1 п. 7 152-ФЗ) — защита от спама, злоупотреблений, атак на сервис.
                  </LI>
                </ul>
                <P>
                  Отправляя форму или пользуясь AI-анализатором, вы
                  подтверждаете, что ознакомлены с настоящей политикой и
                  даёте согласие на обработку указанных данных для
                  перечисленных целей.
                </P>
              </Section>

              <Section id="partners" number="05" title="Кому я передаю данные">
                <P>
                  Для работы сервиса я использую ограниченный круг
                  технологических партнёров. Все они предоставляют
                  собственные гарантии по защите данных.
                </P>
                <ul className="space-y-2 mt-3">
                  <LI>
                    <strong>Vercel Inc.</strong> (США) — хостинг сайта и
                    serverless-функций. Данные передаются в зашифрованном
                    виде, хранятся на серверах провайдера в соответствии с
                    их политикой.
                  </LI>
                  <LI>
                    <strong>Anthropic / OpenAI</strong> (США) — обработка
                    запросов к AI-анализатору. Передаётся только текст
                    описания бизнеса, без идентификаторов. Провайдеры
                    обязуются не использовать данные API для обучения
                    моделей.
                  </LI>
                  <LI>
                    <strong>Resend</strong> — доставка уведомлений о новых
                    заявках мне на email.
                  </LI>
                  <LI>
                    <strong>Telegram Messenger LLP</strong> — доставка
                    уведомлений мне через Bot API (только при использовании
                    соответствующего канала связи).
                  </LI>
                </ul>
                <P>
                  Я не передаю данные рекламным сетям, брокерам данных,
                  соцсетям, маркетинговым агентствам и третьим лицам,
                  не перечисленным выше.
                </P>
              </Section>

              <Section id="retention" number="06" title="Сколько я храню данные">
                <ul className="space-y-2 mt-3">
                  <LI>
                    <strong>Данные формы</strong> — до 12 месяцев после
                    последнего контакта. Если мы заключили договор — в
                    течение срока действия договора и 3 лет после его
                    окончания (для налогового и бухгалтерского учёта).
                  </LI>
                  <LI>
                    <strong>Запросы к AI-анализатору</strong> — не
                    сохраняются постоянно. IP-адрес для rate-limit хранится
                    в оперативной памяти сервера и удаляется в течение часа.
                  </LI>
                  <LI>
                    <strong>Логи сервера</strong> (включая IP) — 7 дней.
                  </LI>
                  <LI>
                    <strong>Аналитические данные</strong> — в агрегированном
                    виде до 24 месяцев.
                  </LI>
                </ul>
              </Section>

              <Section id="rights" number="07" title="Ваши права">
                <P>
                  В соответствии с 152-ФЗ и GDPR вы имеете право:
                </P>
                <ul className="space-y-2 mt-3">
                  <LI>Получить подтверждение факта обработки ваших данных</LI>
                  <LI>Получить копию ваших данных в машиночитаемом формате</LI>
                  <LI>Потребовать исправления неточных данных</LI>
                  <LI>Потребовать удаления данных («право на забвение»)</LI>
                  <LI>Ограничить обработку на время рассмотрения спора</LI>
                  <LI>Отозвать согласие на обработку в любой момент</LI>
                  <LI>
                    Подать жалобу в надзорный орган (Роскомнадзор для РФ,
                    компетентный орган страны пребывания для ЕС)
                  </LI>
                </ul>
                <P>
                  Чтобы реализовать любое из этих прав, напишите на{" "}
                  <a
                    href="mailto:demo@aistartup.ru"
                    className="underline underline-offset-4 decoration-[var(--color-rule)] hover:decoration-[var(--color-flame)]"
                  >
                    demo@aistartup.ru
                  </a>
                  . Отвечу в течение 30 дней (обычно — в тот же день).
                </P>
              </Section>

              <Section id="security" number="08" title="Как я защищаю данные">
                <ul className="space-y-2 mt-3">
                  <LI>Весь трафик сайта — по HTTPS (TLS 1.3)</LI>
                  <LI>Секретные ключи хранятся в переменных окружения, не в коде</LI>
                  <LI>Доступ к логам и уведомлениям — только у меня лично</LI>
                  <LI>Rate-limit на API защищает от массовых запросов</LI>
                  <LI>Регулярные обновления зависимостей для закрытия уязвимостей</LI>
                </ul>
                <P>
                  Несмотря на принимаемые меры, ни одна система передачи данных
                  через Интернет не может гарантировать 100% безопасности.
                  Я прилагаю разумные усилия для защиты ваших данных, но не
                  несу ответственность за последствия событий форс-мажорного
                  характера.
                </P>
              </Section>

              <Section id="changes" number="09" title="Изменения в политике">
                <P>
                  Я могу обновлять настоящую политику — например, при
                  изменении стека используемых сервисов или требований
                  законодательства. Актуальная версия всегда находится по
                  адресу <code className="font-[family-name:var(--font-mono)] text-[13px] bg-[var(--color-paper-2)] px-1.5 py-0.5">/privacy</code>.
                </P>
                <P>
                  Дата последнего обновления указана в начале документа.
                  Существенные изменения будут дополнительно анонсированы на
                  главной странице сайта не менее чем за 14 дней до вступления
                  в силу.
                </P>
              </Section>

              <Section id="contact" number="10" title="Связаться по вопросам">
                <P>
                  Если у вас остались вопросы о том, как я обрабатываю
                  ваши данные, — напишите мне напрямую. Отвечу лично.
                </P>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:demo@aistartup.ru"
                    className="btn-ghost text-[13px] py-2.5 px-5"
                  >
                    demo@aistartup.ru
                  </a>
                  <a
                    href="https://t.me/maribochkareva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-flame text-[13px] py-2.5 px-5"
                  >
                    Написать в Telegram →
                  </a>
                </div>
              </Section>

              {/* End mark */}
              <div className="pt-10 mt-10 border-t border-[var(--color-rule)]">
                <div className="ledger mb-2">конец документа</div>
                <p className="text-[13px] text-[var(--color-ink-3)]">
                  Цифровой мастер · Политика конфиденциальности · v1.0 ·{" "}
                  {UPDATED}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-6 text-[14px] font-medium text-[var(--color-ink)] hover:text-[var(--color-flame)] transition-colors"
                >
                  ← Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}

const TOC = [
  { id: "controller", label: "Кто обрабатывает данные" },
  { id: "what", label: "Какие данные я собираю" },
  { id: "purpose", label: "Зачем я это делаю" },
  { id: "basis", label: "На каком основании" },
  { id: "partners", label: "Кому я передаю данные" },
  { id: "retention", label: "Сколько я храню данные" },
  { id: "rights", label: "Ваши права" },
  { id: "security", label: "Как я защищаю данные" },
  { id: "changes", label: "Изменения в политике" },
  { id: "contact", label: "Связаться по вопросам" },
];

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-5 mb-6">
        <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase text-[var(--color-flame)]">
          /{number}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] leading-[1.05] tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[15px] md:text-[16px] leading-[1.7] text-[var(--color-ink-2)]">
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] text-[18px] leading-tight mt-6 mb-1 text-[var(--color-ink)]">
      {children}
    </h3>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[9px] h-[3px] w-[10px] bg-[var(--color-flame)] flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
