import { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Input, List } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../../../context/auth";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

function Comments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // hook
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) fetchComments();
  }, [auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      console.log("__comments__", data);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    // console.log("DELETE POST", post);
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      //
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <h1 style={{ marginTop: 15 }}>{comments?.length} Comments</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <List.Item actions={[]}>
                <List.Item.Meta
                  description={`On ${item?.postId?.title} | ${
                    item?.postedBy?.name
                  } | ${dayjs(item.createdAt).format("L LT")}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Comments;
