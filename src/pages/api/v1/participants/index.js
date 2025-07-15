import database from "../../../../../infra/database";

export default async function participants(req, res) {
  console.log(process.env.TIME_ZONE_LOCAL);
  const query = `SELECT json_object_agg(date_event_str, event_date ORDER BY date_event_str DESC) AS events
FROM (
  SELECT
    TO_CHAR((dateAt AT TIME ZONE '${process.env.TIME_ZONE_LOCAL}')::date, 'YYYY-MM-DD') AS date_event_str,
    COUNT(*) AS total_participants,
    json_build_object(
      'date', (dateAt AT TIME ZONE '${process.env.TIME_ZONE_LOCAL}')::date,
      'total_participants', COUNT(*),
      'participants', json_agg(
        json_build_object(
          'id', id,
          'date_at', dateAt,
          'date_up', dateUp,
          'file_name', fileName,
          'image_base64', imageBase64,
          'image_url', '${process.env.BASE_API_URL}/image?id=' || id,
          'qrcodeBase64', ''
        )
        ORDER BY dateAt DESC
      )
    ) AS event_date
  FROM participants
  GROUP BY (dateAt AT TIME ZONE '${process.env.TIME_ZONE_LOCAL}')::date
  ORDER BY (dateAt AT TIME ZONE '${process.env.TIME_ZONE_LOCAL}')::date DESC
) AS daily_date;

  `;

  const events = await database.query(query);
  console.log(events.rows[0]);

  return res.status(200).json(events.rows[0]);
}
